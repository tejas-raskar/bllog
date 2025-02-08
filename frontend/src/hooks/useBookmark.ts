import axios from "axios";
import { useEffect, useState } from "react";
import { Blog } from ".";

export const useBookmarks = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bookmarks`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            const bookmarkIds: string[] = response.data.bookmarks.bookmarks;
            Promise.all(
                bookmarkIds.map((id: string) =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    .then(res => res.data.blog)
                )
            )
            .then(fetchedBlogs => {
                setBlogs(fetchedBlogs);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs
    }
}