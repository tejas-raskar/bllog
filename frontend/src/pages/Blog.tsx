import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogDetails } from "../components/BlogDetails";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading) {
        return <div>
            loading...
        </div>
    }
    if (!blog) {
        return <div className="flex justify-center h-screen">
            <div className="flex flex-col justify-center text-xl font-bold">
                Blog not found!
            </div>
        </div>
    }
    return <div> 
        <AppBar />
        <div>
            <BlogDetails blog={ blog }/>
        </div>
    </div>
}