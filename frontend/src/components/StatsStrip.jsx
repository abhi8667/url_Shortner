const StatsStrip = ({ totalLinks, totalClicks }) => {
  const stats = [
    { label: "Total links", value: totalLinks },
    { label: "Total clicks", value: totalClicks },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stats.map((item) => (
        <div
          key={item.label}
          className="animate-riseIn rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-panel"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-ink/60">{item.label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-slateBlue">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
