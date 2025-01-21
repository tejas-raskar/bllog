import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Skeleton } from "../components/Skeleton";

export const Feed = () => {
    const { loading, unauthorised, blogs } = useBlogs();
    const navigate = useNavigate();
    if (unauthorised) {
        navigate('/signin')
    }
    if (loading) {
        return <div>
        <AppBar type="main" username={localStorage.getItem("username") as string}/>
        <div className="flex justify-center"> 
            <div>
                <Skeleton type="feed"/>                
                <Skeleton type="feed"/>                
                <Skeleton type="feed"/>                
            </div>
        </div>
    </div>
    }
    return <div>
        <AppBar type="main" username={localStorage.getItem("username") as string}/>
        <div className="flex justify-center"> 
            <div>
                {blogs.map(blog => 
                <BlogCard 
                id={blog.id || ""}
                authorname = {blog.author?.name || "Anonymous"}  
                title = {blog.title || ""} 
                content= {blog.blog || JSON} 
                publishedDate="Dec. 26, 2024"/>)}
                
            </div>
        </div>
    </div>
}