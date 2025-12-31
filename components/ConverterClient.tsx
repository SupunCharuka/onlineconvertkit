"use client";
import dynamic from "next/dynamic";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

const ConverterUI = dynamic(() => import("./ConverterUI"), { ssr: false });

export default function ConverterClient(props: { mode: "image" | "unit" | "math"; imageConverter?: ImageConverter; unitConverter?: UnitConverter }) {
  return <ConverterUI {...props} />;
}
