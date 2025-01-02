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

export const Editor = () => {
  const [title, setTitle] = useState("");
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
      }),
      Link,
      Underline,
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight,
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