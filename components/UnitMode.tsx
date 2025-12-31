"use client";
import React, { useEffect, useRef, useState } from "react";
import type { UnitConverter } from "../data/unitConverters";

type Props = { unitConverter?: UnitConverter };

function copyToClipboard(text: string) {
    try { navigator.clipboard.writeText(text); } catch { /* ignore */ }
}

export default function UnitMode({ unitConverter }: Props) {
    const [inputValue, setInputValue] = useState<string>("");
    const [outputValue, setOutputValue] = useState<string>("");
    const [decimals, setDecimals] = useState<number>(3);
    const [displayValue, setDisplayValue] = useState<string>("");
    const animRef = useRef<number | null>(null);
    const prevValueRef = useRef<number | null>(null);

    useEffect(() => {
        const targetNum = outputValue ? Number(outputValue) : NaN;
        if (Number.isNaN(targetNum)) {
            setDisplayValue(outputValue || '');
            prevValueRef.current = null;
            return;
        }

        const startNum = prevValueRef.current ?? targetNum;
        const duration = 600; // ms
        const startTime = performance.now();
        if (animRef.current) cancelAnimationFrame(animRef.current);

        const step = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            const ease = 1 - Math.pow(1 - t, 3);
            const cur = startNum + (targetNum - startNum) * ease;
            setDisplayValue(Number(cur).toFixed(decimals));
            if (t < 1) {
                animRef.current = requestAnimationFrame(step);
            } else {
                prevValueRef.current = targetNum;
                animRef.current = null;
            }
        };

        animRef.current = requestAnimationFrame(step);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [outputValue, decimals]);

    function convertUnits() {
        if (!unitConverter) return;
        const v = parseFloat(inputValue);
        if (Number.isNaN(v)) return setOutputValue("");
        let res = v;
        switch (unitConverter.slug) {
            case "meters-to-feet":
                res = v * 3.280839895;
                break;
            case "kilometers-to-miles":
                res = v * 0.621371192237334;
                break;
            case "centimeters-to-inches":
                res = v * 0.3937007874015748;
                break;
            case "inches-to-centimeters":
                res = v * 2.54;
                break;
            case "kilograms-to-pounds":
                res = v * 2.204622621848776;
                break;
            case "grams-to-ounces":
                res = v * 0.03527396194958041;
                break;
            case "liters-to-gallons":
                // US liquid gallons
                res = v * 0.2641720523581484;
                break;
            case "milliliters-to-fluid-ounces":
                res = v * 0.033814022701843;
                break;
            case "celsius-to-fahrenheit":
                res = v * 9 / 5 + 32;
                break;
            case "fahrenheit-to-celsius":
                res = (v - 32) * 5 / 9;
                break;
            case "celsius-to-kelvin":
                res = v + 273.15;
                break;
            case "kelvin-to-celsius":
                res = v - 273.15;
                break;
            case "kmh-to-mph":
                res = v * 0.621371192237334;
                break;
            case "square-meters-to-square-feet":
                res = v * 10.76391041671;
                break;
            case "miles-to-kilometers":
                res = v * 1.609344;
                break;
            case "yards-to-meters":
                res = v * 0.9144;
                break;
            case "feet-to-meters":
                res = v * 0.3048;
                break;
            case "acres-to-square-meters":
                res = v * 4046.8564224;
                break;
            case "hectares-to-square-meters":
                res = v * 10000;
                break;
            case "cups-to-milliliters":
                res = v * 236.5882365;
                break;
            case "pints-to-liters":
                res = v * 0.473176473;
                break;
            case "quarts-to-liters":
                res = v * 0.946352946;
                break;
            case "gallons-to-liters":
                res = v * 3.785411784;
                break;
            case "bar-to-psi":
                res = v * 14.503773773;
                break;
            case "joules-to-calories":
                res = v * 0.239005736;
                break;
            case "joules-to-kilocalories":
                res = v * 0.000239005736;
                break;
            case "seconds-to-minutes":
                res = v / 60;
                break;
            case "minutes-to-hours":
                res = v / 60;
                break;
            case "hours-to-days":
                res = v / 24;
                break;
            case "bytes-to-kilobytes":
                res = v / 1024;
                break;
            case "kilobytes-to-megabytes":
                res = v / 1024;
                break;
            case "degrees-to-radians":
                res = v * (Math.PI / 180);
                break;
            case "radians-to-degrees":
                res = v * (180 / Math.PI);
                break;
            case "pounds-to-kilograms":
                res = v * 0.45359237;
                break;
            case "ounces-to-grams":
                res = v * 28.349523125;
                break;
            case "meters-per-second-to-kmh":
                res = v * 3.6;
                break;
            case "knots-to-kmh":
                res = v * 1.852;
                break;
            default:
                // Unknown converter: pass-through
                res = v;
        }
        setOutputValue(String(Number(res.toFixed(decimals))));
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <div className="md:col-span-2 bg-gradient-to-b from-white/60 to-white/40 dark:from-black/40 dark:to-black/30 rounded-2xl p-4 md:p-6 shadow-lg border border-zinc-100 dark:border-zinc-800">
                    <div className="text-sm text-zinc-500 dark:text-zinc-300">Convert <span className="font-semibold text-zinc-900 dark:text-zinc-50">{unitConverter?.from}</span> → <span className="font-semibold text-zinc-900 dark:text-zinc-50">{unitConverter?.to}</span></div>
                    <label className="mt-4 block">
                        <input
                            inputMode="decimal"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`e.g. 1.23`}
                            className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-extrabold placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
                            aria-label={`Input ${unitConverter?.from}`}
                        />
                        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Tip: use decimals for precise conversions</div>
                    </label>

                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button onClick={convertUnits} aria-label="Convert" className="w-full sm:w-auto inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-5 py-3 text-sm font-semibold shadow-2xl transform-gpu hover:scale-[1.02] transition justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Convert
                        </button>

                        <button onClick={() => { setInputValue(""); setOutputValue(""); }} className="w-full sm:w-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm bg-white/60 dark:bg-black/40 hover:shadow-sm justify-center">
                            Clear
                        </button>

                        <div className="ml-0 sm:ml-auto flex items-center gap-3">
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Decimals</div>
                            <div className="relative">
                                <select aria-label="Decimal places" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} className="appearance-none rounded-md border px-3 py-2 pr-8 w-24 bg-white/40 dark:bg-black/40 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={6}>6</option>
                                </select>
                                <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-zinc-600 dark:text-zinc-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                    <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="rounded-2xl p-4 md:p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-black/60 border border-zinc-100 dark:border-zinc-800 shadow-lg flex flex-col justify-between">
                    <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Result</div>
                        <div className="mt-3">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{displayValue || '—'}</div>
                            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{unitConverter?.to}</div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={() => copyToClipboard(outputValue)} className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-zinc-900 px-4 py-2 hover:shadow transition">
                            Copy
                        </button>
                        <button onClick={() => { setOutputValue(''); setInputValue(''); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2">
                            Reset
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
