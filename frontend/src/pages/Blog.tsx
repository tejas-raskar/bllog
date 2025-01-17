import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogDetails } from "../components/BlogDetails";
import { AppBar } from "../components/AppBar";
import { Skeleton } from "../components/Skeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading) {
        return <div> 
        <AppBar type="main" username={localStorage.getItem("name") as string}/>
        <div>
            <Skeleton type="blog" />
        </div>
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
        <AppBar type="main" username={localStorage.getItem("username") as string}/>
        <div>
            <BlogDetails blog={ blog }/>
        </div>
    </div>
}