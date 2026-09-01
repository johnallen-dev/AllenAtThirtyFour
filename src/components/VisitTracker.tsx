"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
