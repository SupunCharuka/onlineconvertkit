"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type Props = {
    mode: "image" | "unit";
    imageConverter?: ImageConverter;
    unitConverter?: UnitConverter;
};

function downloadDataUrl(dataUrl: string, filename: string) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export default function ConverterUI({ mode, imageConverter, unitConverter }: Props) {
    // Image state
    const [srcDataUrl, setSrcDataUrl] = useState<string | null>(null);
    const [outDataUrl, setOutDataUrl] = useState<string | null>(null);
    const [quality, setQuality] = useState<number>(0.92);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [a11yMessage, setA11yMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const [isDragging, setIsDragging] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [downloadPulse, setDownloadPulse] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [conversionProgress, setConversionProgress] = useState<number>(0);
    const progressTimerRef = useRef<number | null>(null);
    const [lastFile, setLastFile] = useState<File | null>(null);
    const workerRef = useRef<Worker | null>(null);

    // Unit state
    const [inputValue, setInputValue] = useState<string>("");
    const [outputValue, setOutputValue] = useState<string>("");
    const [decimals, setDecimals] = useState<number>(3);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) readFile(f);
    }, []);

    function onDragEnter(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(true);
    }

    function onDragLeave(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
    }

    function readFile(file: File) {
        // validate file type and size
        if (!allowedTypes.includes(file.type)) {
            const msg = "Unsupported file type. Please use PNG, JPG, or WEBP.";
            setErrorMessage(msg);
            setA11yMessage(msg);
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            const msg = `File is too large (max ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB).`;
            setErrorMessage(msg);
            setA11yMessage(msg);
            return;
        }
        setErrorMessage("");
        const reader = new FileReader();
        reader.onload = () => {
            setSrcDataUrl(String(reader.result));
            setOutDataUrl(null);
            setLastFile(file);
            setA11yMessage("Image loaded. Ready to convert.");
        };
        reader.readAsDataURL(file);
    }

    async function convertImage() {
        if (!srcDataUrl || !imageConverter) return;
        setErrorMessage("");
        setA11yMessage("");
        // start conversion UI
        setIsConverting(true);
        setConversionProgress(4);

        // If we have a worker and the original File, use worker for measured progress
        if (lastFile && typeof Worker !== 'undefined') {
            try {
                if (progressTimerRef.current) {
                    window.clearInterval(progressTimerRef.current);
                    progressTimerRef.current = null;
                }
                if (!workerRef.current) {
                    workerRef.current = new Worker('/image-converter-worker.js');
                }
                const wk = workerRef.current;
                wk.onmessage = (ev) => {
                    const d = ev.data || {};
                    if (d.type === 'progress') {
                        setConversionProgress(Number(d.progress || 0));
                        if (d.message) setA11yMessage(String(d.message));
                    } else if (d.type === 'result') {
                        const buf = d.buffer;
                        const mime = d.mime || 'image/jpeg';
                        const outBlob = new Blob([buf], { type: mime });
                        const reader = new FileReader();
                        reader.onload = () => {
                            setOutDataUrl(String(reader.result));
                            setIsConverting(false);
                            setA11yMessage('Conversion complete.');
                            setConversionProgress(100);
                            setTimeout(() => setConversionProgress(0), 700);
                        };
                        reader.readAsDataURL(outBlob);
                    } else if (d.type === 'error') {
                        setIsConverting(false);
                        setErrorMessage(String(d.message || 'Worker error'));
                        setA11yMessage(String(d.message || 'Worker error'));
                        setConversionProgress(0);
                    }
                };

                const arrayBuffer = await lastFile.arrayBuffer();
                wk.postMessage({ type: 'convert', fileBuffer: arrayBuffer, fileType: lastFile.type, targetType: imageConverter.to.toLowerCase(), quality }, [arrayBuffer]);
                return;
            } catch (err) {
                // fall back to main-thread conversion if worker fails
                console.warn('Worker conversion failed, falling back:', err);
            }
        }

        // Fallback: synchronous canvas conversion on main thread
        try {
            if (progressTimerRef.current) {
                window.clearInterval(progressTimerRef.current);
                progressTimerRef.current = null;
            }
            const img = new Image();
            img.src = srcDataUrl;
            await img.decode();
            const canvas = canvasRef.current!;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas not available');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const mime = imageConverter.to.toLowerCase() === 'webp' ? 'image/webp' : 'image/jpeg';
            const dataUrl = canvas.toDataURL(mime, quality);
            setOutDataUrl(dataUrl);
            setIsConverting(false);
            setA11yMessage('Conversion complete.');
            setConversionProgress(100);
            setTimeout(() => setConversionProgress(0), 700);
        } catch (err) {
            setIsConverting(false);
            setConversionProgress(0);
            const msg = 'Conversion failed. Please try a different image.';
            setErrorMessage(msg);
            setA11yMessage(msg);
        }
    }

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (f) readFile(f);
    }

    function convertUnits() {
        if (!unitConverter) return;
        setErrorMessage("");
        setA11yMessage("");
        const v = parseFloat(inputValue);
        if (Number.isNaN(v)) {
            const msg = "Please enter a valid number.";
            setErrorMessage(msg);
            setA11yMessage(msg);
            setShowToast(true);
            return setOutputValue("");
        }
        let res = v;
        if (unitConverter.slug === "meters-to-feet") {
            res = v * 3.280839895;
        } else if (unitConverter.slug === "celsius-to-fahrenheit") {
            res = v * 9 / 5 + 32;
        }
        setOutputValue(String(Number(res.toFixed(decimals))));
    }

    useEffect(() => {
        // Show toast when accessibility or error messages appear.
        if (a11yMessage) {
            setShowToast(true);
            const t = setTimeout(() => {
                setA11yMessage("");
                setShowToast(false);
            }, 4000);
            return () => clearTimeout(t);
        }
        if (errorMessage) {
            setShowToast(true);
        }
    }, [a11yMessage, errorMessage]);

    useEffect(() => {
        return () => {
            if (progressTimerRef.current) {
                window.clearInterval(progressTimerRef.current);
                progressTimerRef.current = null;
            }
        };
    }, []);

    async function copyToClipboard(text: string) {
        try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    }

    function handleLabelKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
        }
    }

    return (
        <section>
            {/* Fixed, creative toast (top-center) — visual + accessible */}
            <div className="fixed inset-x-4 top-6 z-50 flex justify-center pointer-events-none">
                {showToast && (a11yMessage || errorMessage) && (
                    <div className={`pointer-events-auto max-w-xl w-full md:max-w-2xl rounded-xl shadow-lg px-4 py-3 flex items-start gap-3 ${errorMessage ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'} toast-enter toast-backdrop`} role={errorMessage ? 'alert' : 'status'} aria-live={errorMessage ? 'assertive' : 'polite'}>
                        <div className="shrink-0 mt-0.5">
                            {errorMessage ? (
                                <svg className="h-6 w-6 opacity-95" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 002 0zm0 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 opacity-95" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7h2v6H9V7zm0 8h2v2H9v-2z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold">{errorMessage ? 'Error' : 'Status'}</div>
                            <div className="mt-0.5 text-sm leading-snug opacity-95">{errorMessage || a11yMessage}</div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <button onClick={() => { setErrorMessage(''); setA11yMessage(''); setShowToast(false); }} aria-label="Dismiss notification" className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-opacity">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {mode === "image" && (
                <div className="space-y-4">
                    <label
                        role="button"
                        tabIndex={0}
                        aria-label="Upload image file"
                        onKeyDown={handleLabelKeyDown}
                        className={`flex items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors ${isDragging ? 'border-indigo-400 bg-indigo-50/30 dark:bg-indigo-900/30' : 'border-zinc-200 dark:border-zinc-700'}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDrop}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                    >
                        <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={handleFileInput} aria-hidden />
                        <div className="text-center">
                            <svg className="mx-auto h-8 w-8 text-zinc-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Drag & drop an image here, or click to select</div>
                            <div className="mt-1 text-xs text-zinc-400">Supported: PNG, JPG, WEBP</div>
                        </div>
                    </label>

                    {srcDataUrl && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <img src={srcDataUrl} alt={`${imageConverter?.from} source image`} className={`rounded-md max-h-96 w-full object-contain transition-all ${outDataUrl ? 'opacity-80' : 'opacity-100'}`} />
                                    {isConverting && conversionProgress > 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="flex items-center gap-3 bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <svg className="h-14 w-14" viewBox="0 0 36 36" aria-hidden>
                                                    <defs>
                                                        <linearGradient id="g1" x1="0%" x2="100%">
                                                            <stop offset="0%" stopColor="#7c3aed" />
                                                            <stop offset="100%" stopColor="#06b6d4" />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle cx="18" cy="18" r="14" fill="none" stroke="#1f2937" strokeWidth="4" opacity="0.25" />
                                                    <circle cx="18" cy="18" r="14" fill="none" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round"
                                                        strokeDasharray={`${(conversionProgress / 100) * 88} 88`} transform="rotate(-90 18 18)" />
                                                </svg>
                                                <div className="text-white text-sm font-semibold">{conversionProgress}%</div>
                                            </div>
                                        </div>
                                    )}
                                    {errorMessage && <div role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</div>}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-3 items-center">
                                    <button
                                        aria-busy={isConverting}
                                        className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-md transform-gpu transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${isConverting ? 'scale-100 opacity-80' : 'hover:scale-[1.03]'}`}
                                        onClick={convertImage}
                                        aria-label={`Convert to ${imageConverter?.to}`}
                                        title={`Convert to ${imageConverter?.to}`}
                                    >
                                        {isConverting ? (
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                                                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <span>{isConverting ? 'Working…' : `Convert to ${imageConverter?.to}`}</span>
                                    </button>
                                    {outDataUrl && (
                                        <button
                                            className={`inline-flex items-center gap-2 rounded-md bg-white/95 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${downloadPulse ? 'scale-105' : ''}`}
                                            onClick={() => { downloadDataUrl(outDataUrl, `${imageConverter?.slug}.${imageConverter?.to.toLowerCase()}`); setDownloadPulse(true); setA11yMessage('Download started.'); setTimeout(() => setDownloadPulse(false), 260); }}
                                            title="Download converted image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                                <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21 21H3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Download</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <aside className="rounded-md border p-4 bg-zinc-50 dark:bg-zinc-900">
                                <label className="text-sm block">Quality: <span className="ml-1 font-medium">{Math.round(quality * 100)}%</span></label>
                                <input type="range" min={0.5} max={1} step={0.01} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full mt-2" />
                                <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">Output: {imageConverter?.to}</div>
                            </aside>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}

            {/* Accessible status region for screen readers */}
            <div role="status" aria-live="polite" className="sr-only">{a11yMessage}</div>

            {mode === "unit" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <label className="sm:col-span-2">
                            <div className="text-sm text-zinc-600 dark:text-zinc-300">Enter {unitConverter?.from}</div>
                            <input
                                inputMode="decimal"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={`e.g. 1.23`}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                aria-label={`Input ${unitConverter?.from}`}
                            />
                        </label>

                        <div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-300">Decimals</div>
                            <select aria-label="Decimal places" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} className="mt-1 rounded-md border px-2 py-2 w-full">
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={convertUnits} className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 shadow-sm hover:scale-105 transform transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Convert
                        </button>
                        <button onClick={() => { setInputValue(""); setOutputValue(""); }} className="rounded-md border px-4 py-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Clear
                        </button>
                    </div>

                    <div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-300">Result ({unitConverter?.to})</div>
                        <div className="mt-2 flex gap-2 items-center">
                            <input readOnly value={outputValue} className="rounded-md border px-3 py-2 w-full" />
                            <button onClick={() => copyToClipboard(outputValue)} className="rounded-md border px-3 py-2 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                    <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
