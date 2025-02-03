import { Link } from "react-router-dom"
import { Button } from "@material-tailwind/react"
import { Editor } from "@tiptap/core"
import { ProfileMenu } from "./ProfileMenu"
import { Plus, Save, Upload } from "lucide-react"

export const AppBar = ({ type = "main", publish, save, editor }: { type: "main" | "editor", publish?: () => Promise<void>, save?: () => Promise<void>, editor?: Editor }) => {
    return <div className="flex justify-between border-b px-10 py-3">
        <div className="flex flex-col justify-center">
            <Link to={'/feed'}>
                <div className="font-logo text-5xl lg:ml-3">
                    Bllog
                </div>
            </Link>
        </div>
        <div className="flex justify-center">
            {type === "main" ? <div className="flex flex-col justify-center"><Link to={'/create'}>
                <Button size="sm" className="flex items-center gap-1 mr-6 p-2 lg:p-2.5 rounded-full shadow-none hover:shadow-none border-solid border-2 border-gray-500 hover:border-black" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Plus />
                    <div className="hidden md:block">
                        New Blog
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
                    <Button disabled={editor?.storage.characterCount.words() == 0} onClick={save} size="sm" className="flex items-center gap-2 mr-2 p-3 lg:p-3 rounded-full shadow-none hover:shadow-none bg-white text-black border-solid border-2 border-gray-500 hover:border-black" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        <Save size={20}/>
                        <div className="hidden lg:block">
                            Save
                        </div>
                    </Button>
                    <Button disabled={editor?.storage.characterCount.words() == 0} onClick={publish} size="sm" className="flex items-center gap-2 mr-2 p-2 px-3.5 lg:p-3 rounded-full shadow-none hover:shadow-none border-solid border-2 border-gray-500 hover:border-black" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        <Upload size={18}/>
                        <div className="hidden lg:block">
                            Publish
                        </div>
                    </Button>
                </div>
            }
            <div className="flex flex-col justify-center">
                <ProfileMenu username={localStorage.getItem("userName") as string}/>
            </div>
        </div>
    </div>
}