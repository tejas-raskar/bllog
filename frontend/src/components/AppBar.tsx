import { Link } from "react-router-dom"
import { Button } from "@material-tailwind/react"
import { Editor } from "@tiptap/react"
import { ProfileMenu } from "./ProfileMenu"
import { Plus } from "lucide-react"

export const AppBar = ({ type = "main", onClick, editor, username}: { type: "main" | "editor", onClick?: () => Promise<void>,editor?: Editor, username: string }) => {
    return <div className="flex justify-between border-b px-10 py-4">
        <Link to={'/feed'} className="flex justify-center flex-col text-xl">
            <div>
                Bllog
            </div>
        </Link>
        <div className="flex justify-center">
            {type === "main" ? <Link to={'/create'}>
                <Button size="sm" className="flex items-center md:gap-1 mr-6 rounded-full" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg> */}
                    <Plus />
                    <div className="hidden md:block">
                        New Post
                    </div>
                </Button>
            </Link>
                : 
                <div className="flex justify-center">
                    <div className="text-sm font-extralight text-gray-600 mr-4">
                        {editor?.storage.characterCount.words()} words
                        <br></br>
                        {editor?.storage.characterCount.characters()} characters
                    </div>
                    <Button disabled={editor?.storage.characterCount.words() == 0} onClick={onClick} size="sm" className="flex items-center gap-1 mr-6 rounded-full" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="size-5">
                            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                        Publish
                    </Button>
                </div>
            }
            <div>
                {/* <button onClick={() => <ProfileMenu />}>
                    <Avatar name={username} size="big" />
                </button> */}
                <ProfileMenu username={username}/>
            </div>
        </div>
    </div>
}