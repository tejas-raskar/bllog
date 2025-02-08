import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import { toast } from "sonner";

export const Feed = () => {
    const { loading, unauthorised, blogs } = useBlogs();
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bookmarks`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });
                const bookmarkIds: string[] = res.data.bookmarks.bookmarks || [];
                setBookmarks(bookmarkIds);
            } catch (error) {
                console.error("Failed to fetch bookmarks", error);
            }
        };
        fetchBookmarks();
    }, []);

    const handleToggleBookmark = async (id: string, current: boolean) => {
        try {
            let updatedBookmarks: string[];
            if (current) {
                updatedBookmarks = bookmarks.filter((bookmark: string) => bookmark !== id);
            } else {
                updatedBookmarks = bookmarks.includes(id) ? bookmarks : [...bookmarks, id];
            }
            const userId = localStorage.getItem("userID");
            const promise = axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bookmarks`,
                { id: userId, bookmarks: updatedBookmarks },
                { headers: { Authorization: localStorage.getItem("token") || "" } }
            );
            toast.promise(
                promise,
                {
                    loading: current ? "Removing bookmark..." : "Adding bookmark...",
                    success: current ? "Bookmark removed" : "Bookmarked successfully",
                    error: "Error updating bookmark"
                }
            );
            await promise;
            setBookmarks(updatedBookmarks);
        } catch (error) {
            console.error("Failed to toggle bookmark", error);
        }
    };

    if (unauthorised) {
        navigate('/signin');
    }

    if (loading) {
        return (
            <div>
                <AppBar type="main" />
                <div className="flex justify-center">
                    <div>
                        <Skeleton type="feed" />
                        <Skeleton type="feed" />
                        <Skeleton type="feed" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar type="main" />
            <div className="flex justify-center">
                <div className="mt-2">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id || ""}
                            authorname={blog.author?.name || "Anonymous"}
                            title={blog.title || ""}
                            content={blog.blog || JSON}
                            publishedOn={blog.publishedOn}
                            featuredImage={blog.featuredImage}
                            isBookmarked={bookmarks.includes(blog.id as string)}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};