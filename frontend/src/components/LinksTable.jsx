import { Link } from "react-router-dom";

const formatDate = (value) => (value ? new Date(value).toLocaleString() : "Never");

const LinksTable = ({ links }) => {
  if (!links.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/25 bg-white/80 p-8 text-center shadow-panel">
        <p className="text-ink/70">No links yet. Create your first short URL above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/90 shadow-panel">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slateBlue text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Short URL</th>
              <th className="px-4 py-3 font-semibold">Original URL</th>
              <th className="px-4 py-3 font-semibold">Clicks</th>
              <th className="px-4 py-3 font-semibold">Expires</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((item) => {
              const isExpired = item.expiresAt && new Date(item.expiresAt) < new Date();
              return (
                <tr key={item.id} className="border-t border-ink/10 odd:bg-white even:bg-[#fff9f2]">
                  <td className="px-4 py-3">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`font-medium ${isExpired ? "text-gray-400 line-through" : "text-accent hover:underline"}`}
                    >
                      {item.shortUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="line-clamp-1 max-w-[200px] sm:max-w-[320px] text-ink/80 hover:underline"
                      title={item.originalUrl}
                    >
                      {item.originalUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slateBlue">{item.clicks}</td>
                  <td className={`px-4 py-3 ${isExpired ? "text-red-500 font-bold" : "text-ink/70"}`}>
                    {formatDate(item.expiresAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/analytics/${item.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accentDark"
                    >
                      Analytics &rarr;
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinksTable;
