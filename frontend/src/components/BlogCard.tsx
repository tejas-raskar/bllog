interface BlogCardProps {
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorname,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div>
        <div className="flex py-2">
            <div>
                <Avatar name={authorname}/> 
            </div>
            <div className="flex justify-center flex-col pl-2 text-sm">
                {authorname}
            </div>
            <div className="flex justify-center flex-col px-2">
                <CircleSeparator />
            </div>
            <div className="flex justify-center flex-col text-sm font-light text-gray-800">
                {publishedDate}
            </div>
        </div>
        <div className="font-extrabold text-2xl">
            {title}
        </div>
        <div className="text-slate-600 font-serif font-medium py-2">
            {content.slice(0, 150) + "..."}
        </div>
        <div className="font-light text-gray-800 pt-6 pb-2">
            {`${Math.ceil(content.length / 100)} min read`}
        </div>
        <hr /> 
    </div>
} 

function CircleSeparator() {
    return <div className="h-1 w-1 bg-gray-300 rounded-full">

    </div>
}

function Avatar({name}: {name: string}) {
    const splitName = name.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-small text-xs text-gray-600 dark:text-gray-300">{firstName[0] + lastName[0]}</span>
    </div>
    
}