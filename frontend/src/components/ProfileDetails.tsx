import { Github, Linkedin, Twitter } from "lucide-react"
import { Avatar } from "./BlogCard"

export const ProfileDetails = () => {
    return <div className="flex flex-col justify-center">
        <div className="flex justify-center mt-2">
            <Avatar size="xl" name={localStorage.getItem("username") as string} />
        </div>
        <div className="font-bold text-center text-xl mt-2">
            {localStorage.getItem("username")}
        </div>
        <div className="text-center text-gray-800 font-thin mt-3">
            Senior Frontend Developer | Open Source Enthusiast | Tech Writer
        </div>
        <div className="flex justify-center space-x-4 my-6">
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
            >
                <Twitter className="w-5 h-5" />
            </a>
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
            >
                <Github className="w-5 h-5" />
            </a>
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
            >
                <Linkedin className="w-5 h-5" />
            </a>
        </div>
    </div>
}