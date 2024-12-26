import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Feed = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            loading
        </div>
    }
    return <div>
        <AppBar />
        <div className="flex justify-center"> 
            <div>
                {blogs.map(blog => 
                <BlogCard 
                id={blog.id}
                authorname = {blog.author.name} 
                title = {blog.title}
                content= {blog.content} 
                publishedDate="Dec. 26, 2024"/>)}
                
            </div>
        </div>
    </div>
}