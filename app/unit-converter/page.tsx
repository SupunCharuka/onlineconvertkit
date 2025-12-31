import React from "react";
import Link from "next/link";
import UnitIndex from "../../components/UnitIndex";

export default function UnitIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">Unit Converters</h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">Quick, private unit conversions running entirely in your browser.</p>
        </header>

        <UnitIndex />
      </div>
    </main>
  );
}
