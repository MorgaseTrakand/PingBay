import React from "react";

type Props = {};

const Header: React.FC<Props> = () => {
  
  return (
    <>
      <header className="fixed inset-x-0 top-0 h-16 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          {/* Brand (left) */}
          <a href="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-bold">Ping</span>
            <span className="text-xl font-bold">Bay</span>
          </a>

          {/* Auth (right) */}
          <nav className="flex items-center gap-3">
            <a
              href="#login"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Log in
            </a>
            <a
              href="#signup"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;