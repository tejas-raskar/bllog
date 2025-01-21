import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    title?: string;
    content?: string;
    blog?: JSON;
    id?: string;
    author?: {
        name: string;
    }
}

export const useBlog = ({ id } : { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [])

    return {
    loading,
    blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [unauthorised, setUnauthorised] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    setUnauthorised(true);
                }
                setLoading(false);
            });
    }, [])

    return {
    loading,
    unauthorised,
    blogs
    }
}

export const useUserBlogs = ({id}: {id: string}) => {
    const [drafts, setDrafts] = useState<Blog[]>([]);
    const [publishedBlogs, setPublishedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setDrafts(response.data.drafts);
            setPublishedBlogs(response.data.publishedBlogs);
        })
    }, [])
    return {
        drafts,
        publishedBlogs
    }
}