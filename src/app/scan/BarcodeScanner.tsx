"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface DetectedBarcode {
  rawValue: string;
  format: string;
}

interface BarcodeDetectorCtor {
  new (opts?: { formats?: string[] }): {
    detect: (source: CanvasImageSource) => Promise<DetectedBarcode[]>;
  };
  getSupportedFormats?: () => Promise<string[]>;
}

function stopStream(stream: MediaStream | null) {
  if (!stream) return;
  stream.getTracks().forEach((t) => t.stop());
}

export function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);
  const startingRef = useRef(false);
  const router = useRouter();
  const t = useTranslations("scan");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDetected, setLastDetected] = useState<string | null>(null);

  useEffect(() => {
    const hasDetector =
      typeof window !== "undefined" &&
      "BarcodeDetector" in window &&
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia);
    setSupported(Boolean(hasDetector));
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    stopStream(streamRef.current);
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopStream(streamRef.current);
      streamRef.current = null;
    };
  }, []);

  const start = useCallback(async () => {
    if (startingRef.current || streamRef.current) return;
    startingRef.current = true;
    setError(null);
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (!mountedRef.current) {
        stopStream(stream);
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      if (!mountedRef.current) {
        stopStream(stream);
        streamRef.current = null;
        return;
      }
      setRunning(true);
    } catch (e) {
      stopStream(stream);
      if (mountedRef.current) {
        setError((e as Error).message || "Unable to start camera.");
        setRunning(false);
      }
    } finally {
      startingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    const Ctor = (window as unknown as { BarcodeDetector: BarcodeDetectorCtor })
      .BarcodeDetector;
    if (!Ctor) return;
    const detector = new Ctor({
      formats: ["upc_a", "upc_e", "ean_13", "ean_8", "code_128", "code_39", "data_matrix"],
    });
    let cancelled = false;
    const tick = async () => {
      if (cancelled || !videoRef.current) return;
      try {
        const results = await detector.detect(videoRef.current);
        if (results.length > 0) {
          const raw = results[0].rawValue;
          setLastDetected(raw);
          stop();
          router.push(`/ndc?ndc=${encodeURIComponent(raw)}`);
          return;
        }
      } catch {
        // ignore per-frame errors
      }
      if (!cancelled) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [running, router, stop]);

  if (supported === null) {
    return <p className="text-sm text-slate-600">{t("checkingSupport")}</p>;
  }
  if (!supported) {
    return (
      <div className="text-sm text-slate-700 space-y-2">
        <p>
          {t.rich("notSupported", {
            link: (chunks) => (
              <a className="text-brand-700 underline" href="/ndc">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative">
        <video
          ref={videoRef}
          playsInline
          muted
          aria-label={t("videoAria")}
          className="w-full h-full object-cover"
        />
        {!running && (
          <div className="absolute inset-0 grid place-items-center text-white/80 text-sm">
            {t("cameraOff")}
          </div>
        )}
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      {lastDetected && (
        <p className="text-xs text-slate-600">
          {t.rich("detected", {
            code: lastDetected,
          })}
        </p>
      )}
      <div className="flex gap-2">
        {!running ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Camera className="h-4 w-4" aria-hidden /> {t("start")}
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <CameraOff className="h-4 w-4" aria-hidden /> {t("stop")}
          </button>
        )}
      </div>
    </div>
  );
}
