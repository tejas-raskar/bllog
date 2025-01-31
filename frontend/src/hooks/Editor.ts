import { useEditor } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CharacterCount from "@tiptap/extension-character-count";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import { uploadImage } from "../api/Images";
import { common, createLowlight } from 'lowlight'
import {Editor} from '@tiptap/core'

const lowlight = createLowlight(common);

export const useCustomEditor = ({setImages, editable=false}: {setImages: React.Dispatch<React.SetStateAction<string[]>>, editable: boolean}) => useEditor({
    extensions: [
        Placeholder.configure({
            // emptyEditorClass: "before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",
            placeholder: "Start writing here..."
        }),
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3],
            },
            codeBlock: false,
        }),
        Link,
        Underline,
        CharacterCount,
        CodeBlockLowlight.configure({
            lowlight,
        }),
        Image,
        FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor:Editor, files:File[], pos:number) => {
                files.forEach(file => {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.onload = async () => {
                        const response = await uploadImage(file);
                        if (response) {
                            setImages((images: string[]) => [...images, response.$id]);
                            const imageUrl = `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${response.bucketId}/files/${response.$id}/preview?project=${import.meta.env.VITE_PROJECT_ID}`
                            currentEditor.chain().insertContentAt(pos, {
                                type: 'image',
                                attrs: {
                                    src: imageUrl,
                                },
                            }).focus().run()
                        } else {
                            console.log("Error uploading image.")
                        }
                    }
                })
            },
            onPaste: (currentEditor:Editor, files:File[], htmlContent?:string) => {
                files.forEach(file => {
                    if (htmlContent) {
                        console.log(htmlContent)
                        return false
                    }

                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.onload = async () => {
                        const response = await uploadImage(file);
                        if (response) {
                            setImages(images => [...images, response.$id]);
                            const imageUrl = `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${response.bucketId}/files/${response.$id}/preview?project=${import.meta.env.VITE_PROJECT_ID}`
                            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                                type: 'image',
                                attrs: {
                                    src: imageUrl,
                                },
                            }).focus().run()
                        }
                    }
                })
            },
        }),
    ],
    editable: editable,
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none'
        }
    }
})