"use client";
import React from "react";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";
import ImageMode from "./ImageMode";
import UnitMode from "./UnitMode";

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

// Split the UI into two focused inner components so callers can render per-mode logic.
// ImageMode and UnitMode have been moved to separate files to simplify this wrapper.

export default function ConverterUI({ mode, imageConverter, unitConverter }: Props) {
    return (
        <section>
            {mode === 'image' ? <ImageMode imageConverter={imageConverter} /> : <UnitMode unitConverter={unitConverter} />}

            {/* Accessible status region for screen readers */}
            <div role="status" aria-live="polite" className="sr-only"> </div>
        </section>
    );
}
