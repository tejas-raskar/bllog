import { Link, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { ProfileDetails } from "../components/ProfileDetails"
import { useUserBlogs } from "../hooks";
import { ProfileBlogCard } from "../components/ProfileBlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Profile = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [tagline, setTagline] = useState("");
    const response = useUserBlogs({
        id: id || ""
    })

    useEffect(() => {
        const fetchUser = async () => {
            const user = await axios.get(`${BACKEND_URL}/api/v1/user/${id}`)
            setName(user.data.name);
            setTagline(user.data.tagline);
        }
        fetchUser();
    }, [id])
    return <div>
        <AppBar type="main" />
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-full mt-8">
                    <div className="">
                        <div className="flex flex-col justify-center">
                            <ProfileDetails name={name} tagline={tagline} />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="lg:grid grid-cols-4 max-w-4xl mt-8">
                        <div className="col-span-2 mx-6">
                            <div className="text-xl font-bold mt-4 mb-4">
                                Drafts
                            </div>
                            <div className={response.drafts.length > 0 ? "" : "text-gray-600 flex justify-center p-8"}>
                                {response.drafts.length > 0 ? response.drafts.map((draft: any) => (
                                    <Link to={`/create/${draft.id}`}>
                                        <ProfileBlogCard title={draft.title} date={new Date(draft.modifiedOn).toLocaleDateString(
                                            'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })} type="draft" />
                                    </Link>
                                )) : "No drafts"}
                            </div>
                        </div>
                        <hr className="lg:hidden my-4" />
                        <div className="col-span-2 mx-6">
                            <div className="text-xl font-bold mb-4">
                                Published Blogs
                            </div>
                            <div className={response.publishedBlogs.length > 0 ? "" : "text-gray-600 flex justify-center p-8"}>
                                {response.publishedBlogs.length > 0 ? response.publishedBlogs.map((blog: any) => (
                                    <Link to={`/blog/${blog.id}`}>
                                        <ProfileBlogCard title={blog.title} date={new Date(blog.publishedOn).toLocaleDateString(
                                            'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })} type="blog" />
                                    </Link>
                                )) : "No published blogs"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}