import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const BlogDetails = ({ blog }: { blog: Blog }) => {
    return <div className="flex justify-center"> 
        <div className="grid grid-cols-12 px-20 pt-10 w-full max-w-screen-xl"> 
            <div className="col-span-9">
                <div className="text-4xl font-extrabold pb-2">
                    {blog.title}
                </div>
                <div className="font-medium text-gray-400 pb-6">
                    Posted on Dec. 26, 2024
                </div>
                <div className="text-base text-gray-700">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-3">
                <div className="font-medium text-gray-600 mb-2">
                    Author
                </div>
                <div className="flex">
                    <div className="flex justify-center flex-col pr-4">
                        <Avatar size="big" name={blog.author.name}/>
                    </div>
                    <div>
                        <div className="font-bold text-xl">
                            {blog.author.name}
                        </div>
                        <div className="font-medium text-gray-400">
                            Author Bio
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}