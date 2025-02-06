import { AppBar } from "../components/AppBar"
import { useBookmarks } from "../hooks/useBookmark"
import { Skeleton } from "../components/Skeleton";
import { BlogCard } from "../components/BlogCard";

export const Bookmarks = () => {
    const { loading, blogs } = useBookmarks();
    if (loading) {
        return (
            <div>
                <AppBar type="main" />
                <div className="flex justify-center">
                    <div>
                        <div className="text-center font-headline font-bold text-3xl my-4">
                            Bookmarks
                        </div>
                        <hr />
                        <div>
                            <Skeleton type="feed" />
                            <Skeleton type="feed" />
                            <Skeleton type="feed" />
                        </div>
                    </div>  
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar type="main" />
            <div className="flex justify-center">
                <div>
                    <div className="text-center font-headline font-bold text-3xl my-4">
                        Bookmarks
                    </div>
                    <hr />
                    <div className="mt-2">
                        {blogs.length > 0 ? blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id || ""}
                                authorname={blog.author?.name || "Anonymous"}
                                title={blog.title || ""}
                                content={blog.blog || JSON}
                                publishedOn={blog.publishedOn}
                                featuredImage={blog.featuredImage}
                            />
                        )) : <div className="text-gray-600 p-4">Bookmark blogs to see them here</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}