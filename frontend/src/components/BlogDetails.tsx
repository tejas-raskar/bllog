import React, { useState } from "react"
import { Blog } from "../hooks"
import { CircleSeparator } from "./BlogCard"
import { ToC } from "./TableOfContents"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { getHierarchicalIndexes, TableOfContentData, TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import Image from "@tiptap/extension-image"

const MemorizedToC = React.memo(ToC)

export const BlogDetails = ({ blog }: { blog: Blog }) => {
    const [items, setItems] = useState<TableOfContentData>([])
    const editor = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            Image,
            TableOfContents.configure({
                getIndex: getHierarchicalIndexes,
                onUpdate(content:any) {
                    setItems(content)
                },
            }),
        ],
        content: blog.blog,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none'
            }
        }
    })

    if (!editor) {
        return null
    }
    return <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 lg:px-20 pt-10 w-full max-w-screen-xl">
            <div className="col-span-12 lg:col-span-9">
                <div className="mx-5">
                    {blog.featuredImage ? <div className="max-h-64 overflow-clip rounded-md mb-4">
                        <img src={blog.featuredImage} className="object-cover h-64 w-full"  />
                    </div> : null}
                    <div className="text-4xl font-extrabold mb-3">
                        {blog.title}
                    </div>
                    <div className="flex pb-4">
                        <span className="font-medium text-gray-600">{blog.author?.name}</span>
                        <div className="flex flex-col justify-center mx-2"><CircleSeparator /></div>
                        <span className="font-medium text-gray-400">{blog.publishedOn != null ? new Date(blog.publishedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ""}</span>
                    </div>
                </div>
                {/* <BlogReader type="full" blogJSON={blog.blog} /> */}
                <EditorContent editor={editor} />
            </div>
            <div className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-8">
                    <div className="font-bold text-md my-2">
                        On this page
                    </div>
                    <MemorizedToC editor={editor} items={items} />
                </div>
            </div>
        </div>
    </div>
}