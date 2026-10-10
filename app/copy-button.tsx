"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label, className }: { text: string; label: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <button onClick={copy} aria-label={copied ? `${label} copied` : `Copy ${label}`} className={className}>
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={1.75} />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </>
  );
}
