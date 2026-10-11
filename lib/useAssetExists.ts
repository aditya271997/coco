"use client";

import { useEffect, useState } from "react";

/**
 * Checks whether an optional file in /public (photo, music) actually exists,
 * using a cheap HEAD request. Returns `null` while checking.
 */
export function useAssetExists(src: string | null): boolean | null {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return src ? exists : false;
}
