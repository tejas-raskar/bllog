import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { Spinner } from '@material-tailwind/react';

interface RelatedBlog {
  id: string;
  title: string;
  author: {
    name: string;
  };
  featuredImage?: string;
}

export const RelatedBlogs = ({ blogId, blogContent }: { blogId: string, blogContent: any }) => {
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ai/related-blogs`,
          { blogId, content: blogContent },
          {
            headers: {
              Authorization: localStorage.getItem("token") || ""
            }
          }
        );

        if (response.data.relatedBlogs) {
          setRelatedBlogs(response.data.relatedBlogs);
        }
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId && blogContent) {
      fetchRelatedBlogs();
    }
  }, [blogId, blogContent]);

  if (loading) {
    return (
      <div className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-headline font-bold mb-4">Related Articles</h2>
        <div className="flex justify-center">
          <Spinner className="h-8 w-8" onPointerEnterCapture onPointerLeaveCapture/>
        </div>
      </div>
    );
  }

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-8 mt-12">
      <h2 className="text-2xl font-headline font-bold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBlogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {blog.featuredImage && (
                <div className="h-40 overflow-hidden">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-headline font-bold line-clamp-2">{blog.title}</h3>
                <div className="flex items-center mt-2">
                  <Avatar name={blog.author.name} size="small" />
                  <span className="ml-2 text-sm text-gray-600">{blog.author.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};