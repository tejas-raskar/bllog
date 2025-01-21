import { Edit2, ExternalLink } from "lucide-react"

export const ProfileBlogCard = ({ title, type }: { title: string, type: "draft" | "blog" }) => {
    return <div className=" flex justify-between m-3 p-2 px-4 hover:bg-gray-100 rounded-md">
        <div>
            <div className="text-xl text-gray-900 max-w-md">
                {title}
            </div>
            <div className="flex justify-center flex-col text-xs font-light text-gray-600">
                {type === "draft" ? "Last changed on" : "Published on"}
            </div>
        </div>
        <div className="flex flex-col justify-center text-gray-600 hover:text-black">
            {type === "draft" ? <Edit2 /> : <ExternalLink />}
        </div>
    </div>
}