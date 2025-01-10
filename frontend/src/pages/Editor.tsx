import { useEditor } from "@tiptap/react"
import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import StarterKit from '@tiptap/starter-kit'
import { TitleInput } from "../components/TitleInput";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import CharacterCount from "@tiptap/extension-character-count";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import { UploadImage } from "../components/UploadImage";
import { Client, ID, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint()
  .setProject();

const storage = new Storage(client);

export const Editor = () => {
  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState(false);
  const navigate = useNavigate();
  const lowlight = createLowlight(common);
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        emptyEditorClass: "before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",
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
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              const promise = storage.createFile(
                '',
                ID.unique(),
                file
                // document.getElementById('uploader').files[0]
              );

              promise.then(function (response) {
                const result = `https://cloud.appwrite.io/v1/storage/buckets/${response.bucketId}/files/${response.$id}/preview?project=${projectId}`
                console.log(result);
                currentEditor.chain().insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: result,
                  },
                }).focus().run()
                // console.log(response); // Success
              }, function (error) {
                console.log(error); // Failure
              });
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              console.log(htmlContent)
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none'
      }
    }

  })
  if (!editor) {
    return null
  }
  async function publishBlog() {
    if (!editor) return
    const blogJSON = editor.getJSON();
    const blogTitle = title;
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,
        {
          title: blogTitle,
          blog: blogJSON
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )

      if (res.status == 200) {
        navigate(`/blog/${res.data.id}`)
      }
    } catch (e) {
      // TODO: Alert user using toast (?)
    }
  }
  return <div>
    <AppBar type="editor" onClick={publishBlog} editor={editor} />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col p-2 mt-6">
        <div className="max-w-3xl">
          <button onClick={() => setFeaturedImg(!featuredImg)} className="ml-4 p-1 rounded-md hover:bg-gray-200">
            <div className="flex">
              <div className="flex justify-center flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div className="pl-1 tracking-tighter text-sm text-gray-700">
                Add featured image
              </div>
            </div>
          </button>
          <div className="absolute">
            <UploadImage open={featuredImg} />
          </div>
          <div>
            <TitleInput setTitle={setTitle} title={title} />
          </div>
        </div>
        <div className="max-w-3xl">
          <div>
            <Tiptap editor={editor} />
          </div>
        </div>
      </div>
    </div>
  </div>
}