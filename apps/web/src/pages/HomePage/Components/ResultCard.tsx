import React from "react";

type PingResult = {
  status: "Up" | "Down";
  fastestResponseTime: string;
  averageResponseTime: string;
  lastChecked: string;
};

type Props = {
  result: PingResult | null, 
  loading: boolean,
  url: string,
  newPing: number,
  sendURL: Function
};

const ResultCard: React.FC<Props> = ({ result, loading, url, newPing, sendURL }) => {
  return (
    <>
      {/* Sliding result card (floating, slides down & fades in) */}
      <div
        id="result-card"
        className={`pointer-events-auto mt-4 w-full relative transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)]`}
      >
        {/* Tailwind Spinner */}
        {loading && newPing > 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className={`${loading ? 'blur-[3px]' : ''}`}>
          {/* The wrapper that controls the slide/fade */}
          <div
            className={`mx-auto max-w-3xl transform origin-top transition-all duration-300 rounded-xl ${
              result ? "opacity-100 translate-y-0 max-h-[400px]" : "opacity-0 -translate-y-2 max-h-0"
            } overflow-hidden`}
            aria-hidden={!result}
          >
            {/* Actual card: use p-3 to match the form's padding, then inner px-3 so text lines up with input text */}
            <div className="rounded-xl border border-border bg-white/95 backdrop-blur p-3 shadow-lg">
              <div className="px-3">
                <div className="flex items-center justify-between gap-4 mt-1">
                  <h3 className="text-medium font-semibold leading-none">Results for {url}</h3>
                  {/* Status pill */}
                  <div className={`${loading ? 'opacity-[0.01]' : ''} flex items-center gap-2`}>
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
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-1">
                  <div className="">
                    <div className="text-xs text-muted-foreground">Fastest ping</div>
                    <div className="text-lg font-medium">{result?.fastestResponseTime}<span className="text-base">ms</span></div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Average ping</div>
                    <div className="text-lg font-medium">{result?.averageResponseTime}<span className="text-base">ms</span></div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Last checked</div>
                    <div className="text-normal font-medium">Just Now</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        sendURL();
                      }}
                      className="cursor-pointer rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:opacity-95"
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
    </>
  );
};

export default ResultCard;