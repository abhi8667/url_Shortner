import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import api from "../api/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe", "#00c49f"];

const AnalyticsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get(`/urls/analytics/${id}`);
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [id]);

  if (isLoading) return <div className="p-10 text-center text-white">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  const { url, stats } = data;

  const browserData = Object.entries(stats.byBrowser).map(([name, value]) => ({ name, value }));
  const osData = Object.entries(stats.byOS).map(([name, value]) => ({ name, value }));
  const dateData = Object.entries(stats.byDate)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-indigo-400 hover:underline text-sm sm:text-base">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold mt-2">Link Analytics</h1>
            <p className="text-gray-400 mt-1 truncate max-w-md">{url.originalUrl}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <span className="block text-3xl font-bold text-indigo-400">{stats.totalClicks}</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Total Clicks</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clicks Over Time */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-6">Clicks Over Time</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" tickFormatter={(t) => format(new Date(t), "MMM d")} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#818cf8" }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Browser Distribution */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">Browsers</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browserData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {browserData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* OS Distribution */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">Operating Systems</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={osData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
