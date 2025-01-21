import { Link, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { ProfileDetails } from "../components/ProfileDetails"
import { useUserBlogs } from "../hooks";
import { ProfileBlogCard } from "../components/ProfileBlogCard";

export const Profile = () => {
    const { id } = useParams();
    const response = useUserBlogs({
        id: id || ""
    })
    return <div>
        <AppBar type="main" username={localStorage.getItem("username") as string} />
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="lg:grid grid-cols-10 w-full max-w-screen-lg">
                    <div className="col-span-3">
                        <div className="flex flex-col justify-center">
                            <ProfileDetails />
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-6">
                        <div className="text-xl font-bold mt-4 mb-4">
                            Drafts
                        </div>
                        <div className={response.drafts.length > 0 ? "" : "text-gray-600 flex justify-center p-8"}>
                            {response.drafts.length > 0 ?response.drafts.map((draft: any) => (
                                <Link to={`/blog/${draft.id}`}>
                                    <ProfileBlogCard title={draft.title} type="draft"/>
                                </Link>
                            )) : "No drafts yet!"}
                        </div>
                        <div className="text-xl font-bold mt-10 mb-4">
                            Published Blogs
                        </div>
                        <div className={response.publishedBlogs.length > 0 ? "" : "text-gray-600 flex justify-center p-8"}>
                            {response.publishedBlogs.length > 0 ? response.publishedBlogs.map((blog: any) => (
                                <Link to={`/blog/${blog.id}`}>
                                    <ProfileBlogCard title={blog.title} type="blog" />
                                </Link>
                            )) : "No blogs published yet!"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}