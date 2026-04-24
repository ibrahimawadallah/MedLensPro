"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#f7f9fc",
          color: "#0f172a",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            MedLens ran into a problem
          </h1>
          <p style={{ marginTop: "0.5rem", color: "#475569" }}>
            Please try again. If this keeps happening, open the DailyMed site
            directly.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              background: "#1b64eb",
              color: "white",
              borderRadius: "0.75rem",
              padding: "0.5rem 1rem",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#94a3b8",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
