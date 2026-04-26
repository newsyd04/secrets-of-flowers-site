import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SEO from "../components/SEO";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/upload");
    } catch (e) {
      console.error("Login failed:", e);
      setErr("Login failed — check your username and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-300 to-sage-400 flex items-center justify-center px-4 py-32">
      <SEO title="Login" description="Admin login — Secrets of Flowers." />

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-white/30 p-8">
        <div className="text-center mb-7">
          <h1 className="font-Italianno text-5xl text-sage-800 leading-none">
            Secrets of Flowers
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sage-700 font-semibold">
            Admin login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink-700">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
            />
          </label>

          {err && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {err}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
