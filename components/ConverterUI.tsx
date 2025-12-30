"use client";
import React, { useCallback, useRef, useState } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Unit state
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) readFile(f);
  }, []);

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setSrcDataUrl(String(reader.result));
      setOutDataUrl(null);
    };
    reader.readAsDataURL(file);
  }

  async function convertImage() {
    if (!srcDataUrl || !imageConverter) return;
    const img = new Image();
    img.src = srcDataUrl;
    await img.decode();
    const canvas = canvasRef.current!;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // choose mime type
    const mime = imageConverter.to.toLowerCase() === "webp" ? "image/webp" : "image/jpeg";
    const dataUrl = canvas.toDataURL(mime, 0.92);
    setOutDataUrl(dataUrl);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) readFile(f);
  }

  function convertUnits() {
    if (!unitConverter) return;
    const v = parseFloat(inputValue);
    if (Number.isNaN(v)) return setOutputValue("");
    let res = v;
    if (unitConverter.slug === "meters-to-feet") {
      res = v * 3.280839895;
    } else if (unitConverter.slug === "celsius-to-fahrenheit") {
      res = v * 9 / 5 + 32;
    }
    setOutputValue(String(Number(res.toFixed(6))));
  }

  return (
    <section>
      {mode === "image" && (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            style={{ border: "2px dashed #ddd", padding: 20, borderRadius: 8 }}
            aria-label="Drop image here"
          >
            <p>Drag & drop an image here, or</p>
            <input type="file" accept="image/*" onChange={handleFileInput} />
          </div>
          {srcDataUrl && (
            <div style={{ marginTop: 12 }}>
              <img src={srcDataUrl} alt="source" style={{ maxWidth: "100%" }} />
              <div style={{ marginTop: 8 }}>
                <button onClick={convertImage}>Convert to {imageConverter?.to}</button>
                {outDataUrl && (
                  <>
                    <a href={outDataUrl} target="_blank" rel="noreferrer">Preview</a>
                    <button onClick={() => downloadDataUrl(outDataUrl, `${imageConverter?.slug}.${imageConverter?.to.toLowerCase()}`)}>Download</button>
                  </>
                )}
              </div>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {mode === "unit" && (
        <div>
          <label>
            <span>Enter {unitConverter?.from}:</span>
            <input
              inputMode="decimal"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`e.g. 1.23`}
            />
          </label>
          <div style={{ marginTop: 8 }}>
            <button onClick={convertUnits}>Convert</button>
          </div>
          <div style={{ marginTop: 8 }}>
            <label>
              <span>Result ({unitConverter?.to}):</span>
              <input readOnly value={outputValue} />
            </label>
          </div>
        </div>
      )}
    </section>
  );
}
