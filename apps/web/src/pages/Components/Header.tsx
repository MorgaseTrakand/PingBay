import React, { useEffect, useState } from "react";
import { useUpdateUserState } from "@/lib/zustand";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Header: React.FC = () => {
  const isLoggedIn = useUpdateUserState((state) => state.isLoggedIn);
  const auth = useAuth();
  const location = useLocation();
  const [loginPage, setLoginPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (location) {
      setLoginPage(location.pathname === '/login');
      setSignupPage(location.pathname === '/signup');
      setLoaded(true);
    }
  }, [location]);

  return (
    <header className="w-[80%] absolute top-0 left-1/2 -translate-x-1/2 h-16 border border-border bg-background/80 backdrop-blur rounded-xl m-2">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 h-12 px-2">
          <div className="h-6 w-6 rounded-full bg-blue-500" />
          <h1 className="leading-none font-medium text-lg">
            <span>Ping</span><span>Bay</span>
          </h1>
        </a>

        {!isLoggedIn && loaded && (
          <nav className="flex items-center gap-3">
            {!loginPage && <a href="/login" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Log in</a>}
            {!signupPage && <a href="/signup" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Sign up</a>}
          </nav>
        )}

        {isLoggedIn && (
          <nav className="flex items-center gap-3">
            <a href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Dashboard</a>
            <a onClick={() => auth.logout()} className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Logout</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;