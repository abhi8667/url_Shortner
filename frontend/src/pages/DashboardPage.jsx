import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import UrlForm from "../components/UrlForm";
import LinksTable from "../components/LinksTable";
import StatsStrip from "../components/StatsStrip";

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loadUrls = async () => {
    try {
      setIsFetching(true);
      const response = await api.get("/urls");
      setLinks(response.data.data || []);
      setError("");
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        handleLogout();
      } else {
        setError(requestError.message || "Failed to load URLs");
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const handleCreate = async (urlData) => {
    try {
      setIsLoading(true);
      const response = await api.post("/urls/shorten", urlData);
      const created = response.data.data;

      setLinks((current) => {
        const exists = current.some((item) => item.shortCode === created.shortCode);
        if (exists) {
          return current.map((item) =>
            item.shortCode === created.shortCode ? created : item
          );
        }
        return [created, ...current];
      });

      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to create short URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalClicks = useMemo(
    () => links.reduce((sum, item) => sum + item.clicks, 0),
    [links]
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex justify-between items-start">
        <div className="animate-riseIn">
          <p className="inline-block rounded-full border border-ink/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">
            CodeVerse Hackathon
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Smart URL Shortener
          </h1>
          <p className="mt-2 text-sm text-ink/70 sm:text-base">
            Welcome back, <span className="font-bold text-accent">{user?.username}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </header>

      <StatsStrip totalLinks={links.length} totalClicks={totalClicks} />
      <UrlForm onCreate={handleCreate} isLoading={isLoading} />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">My Short Links</h2>
          <button
            onClick={loadUrls}
            disabled={isFetching}
            className="rounded-lg border border-ink/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <LinksTable links={links} />
      </section>
    </main>
  );
};

export default DashboardPage;
