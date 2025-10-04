import React from "react";
import Header from "../Components/Header";
import Form from "./Components/Form";
import { Zap } from 'lucide-react'; // Or pick another icon

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
          {/* Icon with pulse */}
          <div className="mx-auto mb-4 w-16 h-16 p-4 bg-primary/10 rounded-full animate-pulse">
            <Zap className="w-8 h-8 text-primary mx-auto" />
          </div>
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