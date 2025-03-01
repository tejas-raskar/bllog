import { useState, useEffect } from 'react';
import axios from 'axios';

export const ContentTags = ({ blogId, blogContent }: { blogId: string, blogContent: any }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const cachedTags = localStorage.getItem(`blog_tags_${blogId}`);
      if (cachedTags) {
        setTags(JSON.parse(cachedTags));
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ai/generate-tags`,
          { blogId, content: blogContent },
          {
            headers: {
              Authorization: localStorage.getItem("token") || ""
            }
          }
        );

        if (response.data.tags && response.data.tags.length > 0) {
          setTags(response.data.tags);
          localStorage.setItem(`blog_tags_${blogId}`, JSON.stringify(response.data.tags));
        }
      } catch (err) {
        console.error("Error generating tags:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId && blogContent) {
      fetchTags();
    }
  }, [blogId, blogContent]);

  if (loading) {
    return (
      <div className='flex gap-2'>
        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full h-8 w-20" />
        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full h-8 w-20" />
        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full h-8 w-20" />
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag, index) => (
        <div key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-subtitle">
          {tag}
        </div>
      ))}
    </div>
  );
};