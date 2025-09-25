import React, { useState } from "react";

type PingResult = {
  status: "Up" | "Down";
  fastestResponseTime: string;
  averageResponseTime: string;
  lastChecked: string;
};

const defaultResult: PingResult = {
  status: "Up",
  fastestResponseTime: "120 ms",
  averageResponseTime: "188 ms",
  lastChecked: "Just now",
};

const FormWithSlidingCard: React.FC = () => {
  const [url, setURL] = useState("");
  const [result, setResult] = useState<PingResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendURL() {
    setLoading(true);

    try {
      let response = await fetch("http://localhost:3000/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult({ status: "Up", fastestResponseTime: data[0], averageResponseTime: data[2], lastChecked: "Just now"});
    } catch (err) {
      setResult({ status: "Down", fastestResponseTime: "-", averageResponseTime: "-", lastChecked: "Just now"});
    } finally {
      console.log('uh')
      setLoading(false);
    }

  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      {/* URL form */}
      <form
        className="mx-auto w-full rounded-xl border border-border bg-card p-3 shadow-sm relative z-10"
        onSubmit={(e) => {
          e.preventDefault();
          sendURL();
        }}
        aria-describedby="result-card"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="url" className="sr-only">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            inputMode="url"
            value={url}
            onChange={(e) => {
              setURL(e.target.value);
            }}
            placeholder="https://example.com"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-ring focus:outline-ring/50"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 flex items-center gap-2"
            aria-label="Go"
          >
            {loading ? (
              <svg
                className="w-4 h-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
              </svg>
            ) : null}
            Go
          </button>
        </div>
      </form>

      {/* Sliding result card (floating, slides down & fades in) */}
      <div
        id="result-card"
        className="pointer-events-auto mt-4 w-full relative transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)]"
      >
        {/* The wrapper that controls the slide/fade */}
        <div
          className={`mx-auto max-w-3xl transform origin-top transition-all duration-300 ${
            result ? "opacity-100 translate-y-0 max-h-[400px]" : "opacity-0 -translate-y-2 max-h-0"
          } overflow-hidden`}
          aria-hidden={!result}
        >
          {/* Actual card: use p-3 to match the form's padding, then inner px-3 so text lines up with input text */}
          <div className="rounded-xl border border-border bg-white/95 backdrop-blur p-3 shadow-lg">
            <div className="px-3">
              <div className="flex items-start justify-between gap-4 mt-1">
                <div>
                  <h3 className="text-xl font-semibold leading-none -ml-[1.25em] mb-0.5">Monitoring results</h3>
                  <p className="text-sm text-muted-foreground">Results for {url || "https://example.com"}</p>
                </div>

                {/* Status pill */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                      result?.status === "Up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        result?.status === "Up" ? "bg-green-600" : "bg-red-600"
                      }`}
                      aria-hidden
                    />
                    {result?.status}
                  </span>
                </div>
              </div>

              {/* Main row: metrics (2 columns: response time + last checked) */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-1">
                <div className="">
                  <div className="text-xs text-muted-foreground">Fastest ping</div>
                  <div className="text-lg font-medium">{result?.fastestResponseTime}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">Average ping</div>
                  <div className="text-lg font-medium">{result?.averageResponseTime}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">Last checked</div>
                  <div className="text-lg font-medium">{result?.lastChecked}</div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      // quick action: re-check (demo resets to the same default)
                      setResult(null);
                      setLoading(true);
                      setTimeout(() => {
                        setResult(defaultResult);
                        setLoading(false);
                      }, 300);
                    }}
                    className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:opacity-95"
                  >
                    Re-check
                  </button>
                </div>

              </div>
            </div> {/* end inner px-3 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWithSlidingCard;