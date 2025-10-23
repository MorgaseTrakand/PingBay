import React, { useEffect } from "react";
import { getLogs } from "./LiveTailFunctions";

type LogEntry = {
  id: string;
  timestamp: string;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  fresh?: boolean;
};

export function LiveLogPreview() {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const set = new Set<string>();

  async function getPings() {
    let logs : any[] = await getLogs()
    if (logs.length == 0) return;

    logs.forEach((el) => {
      let timestampVal = new Date(el.checked_at).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
      })
      if (set.has(`${timestampVal}|${el.title}`)) return;

      const newLog: LogEntry = {
        id: el.checked_at,
        timestamp: timestampVal,
        level: el.status == 'down' ? 'error' : 'info',
        message: el.status == 'down' ? `${el.title} failed to respond!` : `${el.title} successfully pinged with ${el.latency_ms}ms`,
        fresh: true,
      };
      set.add(`${timestampVal}|${el.title}`)
      setLogs((prev) => [newLog, ...prev].slice(0, 500));

      window.setTimeout(() => {
        setLogs((prev) => prev.map((l) => (l.id === newLog.id ? { ...l, fresh: false } : l)));
      }, 50);
    })
  }

  useEffect(() => {
    getPings();

    const interval = setInterval(() => {
      getPings();
    }, 15_000);

    return () => clearInterval(interval);
  }, [])

  const levelColor = (level: LogEntry["level"]) =>
    level === "error" ? "bg-red-100 text-red-800" :
    level === "warn" ? "bg-yellow-100 text-yellow-800" :
    level === "debug" ? "bg-gray-100 text-gray-800" :
    "bg-green-100 text-green-800";

  return (
    <div className="space-y-3 mb-8">
      <div
        className="h-100 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm text-sm"
        aria-live="polite"
      > 
        <div className="overflow-auto h-full">
          <ul className="divide-y">
            {logs.map((log) => (
              <li
                key={log.id}
                className={
                  "flex gap-3 px-3 py-3 transition-all duration-200 items-center" +
                  (log.fresh
                    ? "opacity-0 -translate-y-2"
                    : "opacity-100 translate-y-0")
                }
              >
                <div className="w-24 text-xs text-gray-500 flex items-center">
                  <p>
                    {log.timestamp}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${levelColor(
                      log.level
                    )}`}
                  >
                    {log.level.toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 break-words text-gray-900">
                  {log.message}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}