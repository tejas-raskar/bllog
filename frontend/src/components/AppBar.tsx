import { Link } from "react-router-dom"
import { Button } from "@material-tailwind/react"
import { Editor } from "@tiptap/react"
import { ProfileMenu } from "./ProfileMenu"
import { Plus, Upload } from "lucide-react"

export const AppBar = ({ type = "main", onClick, editor, username}: { type: "main" | "editor", onClick?: () => Promise<void>,editor?: Editor, username: string }) => {
    return <div className="flex justify-between border-b px-10 py-3">
        <div className="flex flex-col justify-center">
            <Link to={'/feed'}>
                <div className="font-logo text-5xl lg:ml-5">
                    Bllog
                </div>
            </Link>
        </div>
        <div className="flex justify-center">
            {type === "main" ? <div className="flex flex-col justify-center"><Link to={'/create'}>
                <Button size="sm" className="flex items-center md:gap-1 mr-6 rounded-full" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Plus />
                    <div className="hidden md:block">
                        New Post
                    </div>
                </Button>
            </Link>
            </div>
                : 
                <div className="flex justify-center">
                    <div className="text-sm font-extralight text-gray-600 mr-4">
                        {editor?.storage.characterCount.words()} words
                        <br></br>
                        {editor?.storage.characterCount.characters()} characters
                    </div>
                    <Button disabled={editor?.storage.characterCount.words() == 0} onClick={onClick} size="sm" className="flex items-center gap-2 mr-6 rounded-full" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        <Upload size={20}/>
                        Publish
                    </Button>
                </div>
            }
            <div className="flex flex-col justify-center">
                {/* <button onClick={() => <ProfileMenu />}>
                    <Avatar name={username} size="big" />
                </button> */}
                <ProfileMenu username={username}/>
            </div>
        </div>
    </div>
}