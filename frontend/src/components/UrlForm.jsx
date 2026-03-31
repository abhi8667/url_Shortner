import { useState } from "react";

const UrlForm = ({ onCreate, isLoading }) => {
  const [urlInput, setUrlInput] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!urlInput.trim()) {
      return;
    }

    await onCreate({
      originalUrl: urlInput.trim(),
      customCode: customCode.trim() || undefined,
      expiresAt: expiresAt || undefined,
    });

    setUrlInput("");
    setCustomCode("");
    setExpiresAt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-riseIn rounded-2xl border border-ink/10 bg-white/90 p-4 shadow-panel backdrop-blur sm:p-6"
    >
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
          Create a short URL
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Paste your long link and generate a trackable short URL instantly.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            placeholder="https://example.com/your/very/long/path"
            className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap"
          >
            {isLoading ? "Creating..." : "Shorten URL"}
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accentDark"
          >
            {showOptions ? "- Hide Options" : "+ Advanced Options (Custom Alias, Expiry)"}
          </button>
        </div>

        {showOptions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-ink/60 uppercase">Custom Alias</label>
              <input
                type="text"
                placeholder="my-custom-link"
                className="rounded-xl border border-ink/20 bg-white px-4 py-2 text-sm outline-none transition focus:border-accent"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-ink/60 uppercase">Expiration Date</label>
              <input
                type="datetime-local"
                className="rounded-xl border border-ink/20 bg-white px-4 py-2 text-sm outline-none transition focus:border-accent"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default UrlForm;
