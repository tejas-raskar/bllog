import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bookmark, BookmarkCheck, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface BlogCardProps {
    id: string;
    authorname: string;
    title: string;
    content: JSON;
    publishedOn: Date;
    featuredImage?: string;
    isBookmarked?: boolean;
    onToggleBookmark?: (id: string, current: boolean) => Promise<void>;
}

export const BlogCard = ({
    id,
    authorname,
    title,
    content,
    publishedOn,
    featuredImage,
    isBookmarked,
    onToggleBookmark
}: BlogCardProps) => {

    const toggleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleBookmark && isBookmarked !== undefined) {
            await onToggleBookmark(id, isBookmarked);
        }
    };

    return (
        <div className="relative">
            <Link to={`/blog/${id}`}>
                <div className="p-3 max-w-3xl hover:bg-gray-50 rounded-md">
                    <div className="flex py-2">
                        <div>
                            <Avatar name={authorname} size="small" />
                        </div>
                        <div className="flex justify-center flex-col pl-2 font-subtitle text-sm">
                            {authorname}
                        </div>
                        <div className="flex justify-center flex-col px-2">
                            <CircleSeparator />
                        </div>
                        <div className="flex justify-center flex-col text-sm font-subtitle font-light text-gray-800">
                            {new Date(publishedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="font-extrabold font-headline text-2xl">
                                {title}
                            </div>
                            <div className="text-gray-800 font-subtitle font-normal py-2 pr-8 text-left text-pretty">
                                <BlogReader type="mini" blogJSON={content} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="h-40 w-40 overflow-clip rounded-md">
                                {featuredImage ? <img src={featuredImage} className="object-cover w-full h-full" alt="Blog featured" /> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-2" />
            </Link>
            {onToggleBookmark && isBookmarked !== undefined && (
                <button
                    onClick={toggleBookmark}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-100 hover:text-black"
                    aria-label="Toggle Bookmark"
                >
                    {isBookmarked ? <BookmarkCheck className="text-[#FF8C4B]" size={20} /> : <Bookmark className="" size={20} />}
                </button>
            )}
        </div>
    );
};

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
    });
    if (!editor) return null;
    const rawText = editor.getText();
    const numberOfWords = rawText.split(' ').length;
    const description = rawText.slice(0, 360);
    if (type === "mini") {
        return (
            <div className="flex flex-col justify-between">
                <div className="max-h-32 line-clamp-3">
                    {description}
                </div>
                <div className="flex mt-6 text-gray-800">
                    <div className="font-light text-xs">
                        {`${Math.ceil(numberOfWords / 265)} min read`}
                    </div>
                </div>
            </div>
        );
    } else {
        return <EditorContent editor={editor} />;
    }
}

export function CircleSeparator() {
    return <div className="h-1 w-1 bg-gray-300 rounded-full"></div>;
}

export function Avatar({ name, size }: { name?: string, size: "small" | "big" | "xl" }) {
    let firstName = '';
    let lastName = '';
    if (name) {
        const splitName = name.split(' ');
        firstName = splitName[0];
        lastName = splitName[1] || "";
    }
    return (
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6 bg-[#BEA1FA]" : size === "big" ? "w-10 h-10" : "w-24 h-24 bg-gray-100"} overflow-hidden rounded-full`}>
            <span className={`font-small ${size === "small" ? "text-xs text-black" : size === "big" ? "text-base text-[#BEA1FA]": "text-base text-gray-600"}  dark:text-gray-300`}>
                {name ? firstName[0] + (lastName ? lastName[0] : "") : <User />}
            </span>
        </div>
    );
}