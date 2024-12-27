import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Button } from "@material-tailwind/react"

export const AppBar = () => {
    return <div className="flex justify-between border-b px-10 py-4">
        <Link to={'/feed'} className="flex justify-center flex-col text-xl">
            <div>
                Bllog
            </div>
        </Link>
        <div className="flex justify-center">
            <Link to={'/create'}>
                <Button size="sm" className="flex items-center gap-1 mr-6 rounded-full" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    New Post
                </Button>
            </Link>
            <div>
                <Avatar name="Tejas Raskar" size="big"/>
            </div>
        </div>
    </div>
}