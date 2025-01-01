import { ReactNode } from "react"

export const FloatingMenuItem = ({ icon, title, description }: { icon: ReactNode, title: string, description: string }) => {
    return <div className="flex my-1">
        <div className="flex flex-col justify-center">
            <div className="bg-gray-200 p-2 rounded-md">
                {icon}
            </div>
        </div>
        <div className="flex flex-col ml-2">
            <div className="text-left">
                {title}
            </div>
            <div className="font-light text-gray-500 text-sm text-left">
                {description}
            </div>
        </div>
    </div>
}