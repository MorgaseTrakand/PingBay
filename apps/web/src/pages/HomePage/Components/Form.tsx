import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";

type PingResult = {
  status: "Up" | "Down";
  fastestResponseTime: string;
  averageResponseTime: string;
  lastChecked: string;
};

const FormWithSlidingCard: React.FC = () => {
  const [tempURL, setTempURL] = useState("");
  const [url, setURL] = useState("");
  const [result, setResult] = useState<PingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [newPing, setNewPing] = useState(-1);

  async function sendURL() {
    setLoading(true);

    try {
      let response = await fetch(import.meta.env.VITE_PING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult({ status: "Up", fastestResponseTime: data.fastest, averageResponseTime: data.average, lastChecked: "Just now"});
    } catch (err) {
      setResult({ status: "Down", fastestResponseTime: "-", averageResponseTime: "-", lastChecked: "Just now"});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url) {
      sendURL();
    }
  }, [newPing])

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      {/* URL form */}
      <form
        className="mx-auto w-full rounded-xl border border-border bg-card p-3 shadow-sm relative z-10"
        onSubmit={(e) => {
          e.preventDefault();
          setURL(tempURL)
          setNewPing(newPing+1)
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
            value={tempURL}
            onChange={(e) => {
              setTempURL(e.target.value);
            }}
            placeholder="https://example.com"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-ring focus:outline-ring/50"
          />
          <button
            type="submit"
            className="cursor-pointer shrink-0 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 flex items-center gap-2"
            aria-label="Go"
          >
            {loading && (
              <div className="w-3 h-3 border-1 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            Go
          </button>
        </div>
      </form>
      <ResultCard result={result} url={url} loading={loading} newPing={newPing} sendURL={sendURL}/>
    </div>
  );
};

export default FormWithSlidingCard;