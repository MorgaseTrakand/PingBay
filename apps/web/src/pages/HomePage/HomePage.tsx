import React from "react";
import Header from "./Components/Header";

type Props = {
  // define props here if needed, e.g. title?: string;
};

const HomePage: React.FC<Props> = () => {
  return (
    <>
      <div className="min-h-dvh bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="grid min-h-dvh place-items-center px-4 pt-16">
        <section className="w-full max-w-xl text-center">
          {/* Large text (now on top) */}
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Monitor uptime the simple way.
          </h1>

          {/* Smaller text (now below) */}
          <p className="mb-8 text-sm text-muted-foreground">
            Minimal pings, maximum signal.
          </p>

          {/* URL form: single field + button on the right */}
          <form
            className="mx-auto w-full rounded-xl border border-border bg-card p-3 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const url = (data.get("url") as string) ?? "";
              // TODO: handle your search/go logic with `url`
              console.log("Go:", url);
            }}
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
                placeholder="https://example.com"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-ring focus:outline-ring/50"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90"
                aria-label="Go"
              >
                Go
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
    </>
  );
};

export default HomePage;
