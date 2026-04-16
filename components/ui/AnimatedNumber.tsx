"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up from 0 to its target value on mount.
 * Handles formatted strings like "$1,234,567" and "50,000+" by extracting
 * the numeric portion and preserving prefix/suffix characters.
 */
export default function AnimatedNumber({
  value,
  duration = 800,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;

    // Extract prefix (e.g. "$"), numeric core, and suffix (e.g. "+", "%")
    const match = value.match(/^([^0-9]*?)([\d,]+(?:\.\d+)?)(.*?)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (isNaN(target) || target === 0) {
      setDisplay(value);
      return;
    }

    animated.current = true;
    const hasDecimals = numStr.includes(".");
    const decimalPlaces = hasDecimals ? (numStr.split(".")[1]?.length ?? 0) : 0;
    const hasCommas = numStr.includes(",");
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      let formatted: string;
      if (hasDecimals) {
        formatted = current.toFixed(decimalPlaces);
      } else {
        formatted = Math.round(current).toString();
      }
      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
