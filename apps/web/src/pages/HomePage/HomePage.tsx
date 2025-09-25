import React from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";

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
          
          <Form />
        </section>
      </main>
    </div>
    </>
  );
};

export default HomePage;
