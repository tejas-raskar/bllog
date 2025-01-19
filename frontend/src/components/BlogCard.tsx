import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorname: string;
    title: string;
    content: JSON;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorname,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}> 
        <div className="p-3 max-w-2xl">
            <div className="flex py-2">
                <div>
                    <Avatar name={authorname} size="small"/> 
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
            <div className="text-slate-600 font-medium py-2">                
                <BlogReader type="mini" blogJSON={content}/>
            </div>
            <hr /> 
        </div>
    </Link>
} 

export function BlogReader({ blogJSON, type }: { blogJSON: JSON, type: "mini" | "full" }) {
    const editor = useEditor({
        editable: false,
        extensions: [StarterKit, Image],
        content: blogJSON,
        editorProps: {
            attributes: {
              class: 'prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none'
            }
          }
    })
    if(!editor) return;
    const rawText = editor.getText();
    const numberOfWords = rawText.split(' ').length;
    const description = rawText.slice(0,360);
    if(type === "mini") {
        return <div> 
            <div className="max-h-32 line-clamp-3">
                {description}
            </div>
            <div className="font-light text-xs text-gray-800 pt-6 pb-2">
                {`${Math.ceil(numberOfWords / 265)} min read`}
            </div>
        </div>
    } else {
        return <EditorContent editor={editor} />
    }
}

export function CircleSeparator() {
    return <div className="h-1 w-1 bg-gray-300 rounded-full">

    </div>
}

export function Avatar({name, size}: {name: string, size: "small" | "big" | "xl"}) {
    const splitName = name.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : size == "big" ? "w-10 h-10" : "w-24 h-24"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-small ${size === "small" ? "text-xs" : "text-base"} text-gray-600 dark:text-gray-300`}>{firstName[0] + lastName[0]}</span>
    </div>
    
}