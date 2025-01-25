import { Avatar } from "./BlogCard"

export const ProfileDetails = ({ name, tagline }: { name:string, tagline:string}) => {
    return <div className="flex flex-col justify-center">
        <div className="flex justify-center mt-2">
            <Avatar size="xl" name={name} />
        </div>
        <div className="font-bold text-center text-xl mt-2">
            {name}
        </div>
        <div className="text-center text-gray-800 font-thin mt-3">
            {tagline}
        </div>
    </div>
}