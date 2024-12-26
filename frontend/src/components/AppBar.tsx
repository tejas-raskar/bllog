import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return <div className="flex justify-between border-b px-10 py-4">
        <div className="flex justify-center flex-col text-xl">
            Bllog
        </div>
        <div>
            <Avatar name="Tejas Raskar" size="big"/>
        </div>
    </div>
}