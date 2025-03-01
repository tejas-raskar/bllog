import { useState, useEffect } from "react";
import axios from "axios";
import { Sparkle, ChevronDown, ChevronUp } from "lucide-react";

export const BlogSummary = ({ blogId, blogContent }: { blogId: string, blogContent: any }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      const cachedSummary = localStorage.getItem(`blog_summary_${blogId}`);
      if (cachedSummary) {
        setSummary(cachedSummary);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ai/summarize`,
          { blogId, content: blogContent },
          {
            headers: {
              Authorization: localStorage.getItem("token") || ""
            }
          }
        );

        if (response.data.summary) {
          setSummary(response.data.summary);
          localStorage.setItem(`blog_summary_${blogId}`, response.data.summary);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    };

    if (blogId && blogContent) {
      fetchSummary();
    }
  }, [blogId, blogContent]);

  if (error || !summary) {
    return null;
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#FF8C4B] to-[#BEA1FA] blur-sm opacity-45"></div>
      <div className="relative bg-white rounded-lg p-4 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkle size={22} className="-translate-x-1 -translate-y-1 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
              <Sparkle size={15} className="absolute -bottom-0.5 -right-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
              <svg width="0" height="0">
                <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%">
                  <stop stopColor="#BEA1FA" offset="0%" />
                  <stop stopColor="#FF8C4B" offset="100%" />
                </linearGradient>
              </svg>
            </div>
            <span className="font-headline font-bold">Summary</span>
          </div>
          {isExpanded ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "mt-2 max-h-96" : "max-h-0"}`}>
          <p className="text-gray-700 font-subtitle">{loading ? <Skeleton /> : summary}</p>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="animate-pulse bg-gray-100 rounded-lg h-5 w-full"></div>
      <div className="animate-pulse bg-gray-100 rounded-lg h-5 w-full"></div>
      <div className="animate-pulse bg-gray-100 rounded-lg h-5 w-full"></div>
    </div>
  );
}