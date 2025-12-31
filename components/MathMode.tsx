"use client";
import React, { useState } from "react";

export default function MathMode() {
    const [expr, setExpr] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [history, setHistory] = useState<Array<{ expr: string; result: string }>>([]);
    const [busy, setBusy] = useState(false);
    const [symbolicAvailable, setSymbolicAvailable] = useState<boolean | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    async function evalNumeric() {
        setBusy(true);
        try {
            const math = await import('mathjs');
            const res = math.evaluate(expr);
            const out = typeof res === 'number' || typeof res === 'string' ? String(res) : JSON.stringify(res);
            setResult(out);
            setHistory((h) => [{ expr, result: out }, ...h].slice(0, 20));
        } catch (err: any) {
            setResult(String(err?.message || err));
        } finally {
            setBusy(false);
        }
    }

    async function doSymbolic(op: 'simplify' | 'derivative' | 'integral' | 'solve' | 'expand' | 'factor' | 'steps') {
        setBusy(true);
        try {
            const AlgebriteModule = await import('algebrite').catch(() => null);
            const Algebrite = (AlgebriteModule as any)?.default ?? (AlgebriteModule as any);
            if (!Algebrite) {
                setSymbolicAvailable(false);
                setResult('Algebrite not available. Run `npm install algebrite` to enable symbolic features.');
                return;
            }
            setSymbolicAvailable(true);
            let out = '';
            if (op === 'simplify') {
                out = Algebrite.run(`simplify(${expr})`);
            } else if (op === 'derivative') {
                out = Algebrite.run(`d(${expr}, x)`);
            } else if (op === 'integral') {
                out = Algebrite.run(`integral(${expr})`);
            } else if (op === 'expand') {
                out = Algebrite.run(`expand(${expr})`);
            } else if (op === 'factor') {
                out = Algebrite.run(`factor(${expr})`);
            } else if (op === 'solve') {
                // try solve(expr, x) then fall back to roots
                out = Algebrite.run(`solve(${expr}, x)`);
                if (!out || String(out).trim() === '') {
                    out = Algebrite.run(`roots(${expr})`);
                }
            } else if (op === 'steps') {
                // simple step-by-step: show simplify, expand, factor results
                const s = Algebrite.run(`simplify(${expr})`);
                const e = Algebrite.run(`expand(${expr})`);
                const f = Algebrite.run(`factor(${expr})`);
                out = `1) simplify:\n${s}\n\n2) expand:\n${e}\n\n3) factor:\n${f}`;
            }
            setResult(String(out));
            setHistory((h) => [{ expr: `${op}(${expr})`, result: String(out) }, ...h].slice(0, 20));
        } catch (err: any) {
            setResult(String(err?.message || err));
        } finally {
            setBusy(false);
        }
    }

    function copyResult() {
        if (!result) return;
        navigator.clipboard?.writeText(result);
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-gradient-to-b from-white/80 to-white/60 dark:from-zinc-900/60 dark:to-zinc-900/40 p-6 shadow-2xl backdrop-blur-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg transform-gpu">ƒ</div>
                        <div>
                            <div className="text-xl font-bold tracking-tight">Math Converter</div>
                            <div className="text-sm text-zinc-500 dark:text-zinc-400">Evaluate · simplify · differentiate · integrate — in-browser</div>
                        </div>
                    </div>

                    <div className="flex w-full sm:w-auto flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="text-sm text-zinc-500">Mixed: numeric + symbolic</div>
                        <div className="flex w-full sm:w-auto gap-2">
                            <button aria-expanded={showHelp} onClick={() => setShowHelp((v) => !v)} className="flex-1 sm:flex-none w-full sm:w-auto px-3 py-2 rounded-md bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm shadow-sm hover:scale-[1.02] transition-transform">{showHelp ? 'Hide help' : 'Help'}</button>
                            <button onClick={() => { setExpr(''); setResult(''); }} className="flex-1 sm:flex-none w-full sm:w-auto px-3 py-2 rounded-md bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm shadow-sm hover:scale-[1.02] transition-transform">Clear</button>
                        </div>
                    </div>
                </div>

                    <div className="mt-5">
                    <label className="sr-only">Expression</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input aria-label="Expression" value={expr} onChange={(e) => setExpr(e.target.value)} className="flex-1 rounded-xl border px-4 py-3 text-base font-medium bg-white/95 dark:bg-zinc-900/70 shadow-inner focus:ring-2 focus:ring-indigo-300 focus:outline-none transition" placeholder="e.g. 2+2, sin(pi/4), x^2 + 2*x + 1" />
                        <button disabled={busy || !expr} onClick={evalNumeric} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-semibold shadow-lg transition-transform transform-gpu">Evaluate</button>
                    </div>

                    <div className="mt-3">
                        <div className="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3">
                            {['+', '-', '*', '/', '^', 'sqrt(', 'sin(', 'cos(', 'tan(', 'log('].map((op) => (
                                <button key={op} onClick={() => setExpr((s) => s + op)} className="min-w-[3.5rem] cursor-pointer flex-shrink-0 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm shadow-sm hover:shadow-md transition">{op}</button>
                            ))}
                        </div>
                    </div>

                    {showHelp && (
                        <div className="mt-4 rounded-md border p-3 bg-white/60 dark:bg-zinc-900/60 text-sm text-zinc-700 dark:text-zinc-300">
                            <div className="font-medium mb-2">Quick syntax guide</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                    <div className="font-semibold">Basic</div>
                                    <div className="mt-1">Operators: <code className="font-mono">+ - * / ^</code></div>
                                    <div className="mt-1">Power: <code className="font-mono">a^b</code> or <code className="font-mono">pow(a,b)</code></div>
                                    <div className="mt-2 font-semibold">Constants</div>
                                    <div className="mt-1"><code className="font-mono">pi</code> (π), <code className="font-mono">e</code> (Euler)</div>
                                </div>

                                <div>
                                    <div className="font-semibold">Functions (Math.js)</div>
                                    <div className="mt-1 grid gap-2">
                                        {[
                                            { name: 'sin(x)', ex: 'sin(pi/4)' },
                                            { name: 'cos(x)', ex: 'cos(pi/3)' },
                                            { name: 'tan(x)', ex: 'tan(pi/6)' },
                                            { name: 'sqrt(x)', ex: 'sqrt(9)' },
                                            { name: 'log(x)', ex: 'log(10)' },
                                            { name: 'exp(x)', ex: 'exp(1)' },
                                            { name: 'abs(x)', ex: 'abs(-5)' }
                                        ].map((f) => (
                                            <div key={f.name} className="flex items-center justify-between">
                                                <div className="truncate"><code className="font-mono">{f.name}</code> — <span className="text-zinc-500">e.g. {f.ex}</span></div>
                                                <button onClick={() => setExpr(f.ex)} className="ml-3 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">Use</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="font-semibold">Symbolic (Algebrite)</div>
                                    <div className="mt-1">Simplify: <code className="font-mono">simplify(expr)</code></div>
                                    <div>Derivative: <code className="font-mono">d(expr,x)</code></div>
                                    <div>Integral: <code className="font-mono">integral(expr)</code></div>
                                    <div className="mt-2 text-xs text-zinc-500">Examples:</div>
                                        <div className="mt-2 flex flex-col gap-2">
                                            <button onClick={() => setExpr('simplify(x^2 + 2*x + 1)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">simplify(x^2 + 2*x + 1)</button>
                                            <button onClick={() => setExpr('d(x^3, x)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">d(x^3, x)</button>
                                            <button onClick={() => setExpr('integral(x^2, x)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">integral(x^2, x)</button>
                                            <button onClick={() => setExpr('solve(x^2 - 1)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">solve(x^2 - 1)</button>
                                            <button onClick={() => setExpr('expand((x+1)^2)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">expand((x+1)^2)</button>
                                            <button onClick={() => setExpr('factor(x^2 + 2*x + 1)')} className="text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs">factor(x^2 + 2*x + 1)</button>
                                        </div>
                                </div>

                                <div>
                                    <div className="font-semibold">Docs & links</div>
                                    <div className="mt-1"><a href="https://mathjs.org/docs/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Math.js docs</a></div>
                                    <div className="mt-1"><a href="https://algebrite.org/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Algebrite</a></div>
                                    <div className="mt-1 text-xs text-zinc-500">Math.js reference includes functions and numeric behavior; Algebrite provides symbolic CAS features.</div>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-zinc-500">Tips: press operator chips to append tokens; press "Use" to load an example into the input.</div>
                        </div>
                    )}

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            <div className="rounded-lg border p-3 bg-white/70 dark:bg-zinc-900/60">
                                    <div className="flex items-center justify-between">
                                        {/* <div className="text-sm font-medium">Result</div> */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button disabled={!expr} onClick={() => doSymbolic('simplify')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Simplify</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('derivative')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">d/dx</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('integral')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">∫</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('solve')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Solve</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('expand')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Expand</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('factor')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Factor</button>
                                            <button disabled={!expr} onClick={() => doSymbolic('steps')} className="cursor-pointer px-3 py-1 rounded-md text-sm bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Steps</button>
                                            <button disabled={!result} onClick={copyResult} className="cursor-pointer px-3 py-1 rounded-md border text-sm">Copy</button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <pre className="rounded-xl min-h-[5rem] border bg-gradient-to-r from-white/80 to-white/70 dark:from-zinc-900/60 dark:to-zinc-800 p-4 text-sm whitespace-pre-wrap font-mono shadow-inner">{result || '—'}</pre>
                                    </div>
                            </div>
                        </div>

                        <aside className="rounded-lg border p-3 bg-white/60 dark:bg-zinc-900/60">
                            <div className="text-sm font-medium">Examples</div>
                            <div className="mt-2 flex flex-col gap-2">
                                {['2+2', 'sin(pi/4)', 'x^2 + 2*x + 1', 'integrate(x^2, x)', 'diff(x^3, x)'].map((ex) => (
                                    <button key={ex} onClick={() => setExpr(ex)} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">{ex}</button>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {history.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {history.map((h, i) => (
                        <div key={i} className="rounded-lg border p-3 bg-white/60 dark:bg-zinc-900/60">
                            <div className="text-xs text-zinc-500">{h.expr}</div>
                            <div className="mt-2 font-mono text-sm text-zinc-700 dark:text-zinc-200">{h.result}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
