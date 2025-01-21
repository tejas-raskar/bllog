import { Link, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { ProfileDetails } from "../components/ProfileDetails"
import { useUserBlogs } from "../hooks";

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
                        <div className="">
                            <ProfileDetails />
                        </div>
                    </div>
                    <div className="col-span-7">
                        <div className="text-xl font-bold mt-2 mb-4">
                            Drafts
                        </div>
                        {response.drafts.map((draft: any) => (
                            <Link to={`/blog/${draft.id}`}>
                                <div className="text-lg">
                                    {draft.title}
                                </div>
                            </Link>
                            // <div key={draft.id}>{draft.title}</div>
                        ))}
                        <div className="text-xl font-bold mt-10 mb-4">
                            Published Blogs
                        </div>
                        {response.publishedBlogs.map((blog) => (
                            <Link to={`/blog/${blog.id}`}>
                                <div>
                                    {blog.title}
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </div>
}