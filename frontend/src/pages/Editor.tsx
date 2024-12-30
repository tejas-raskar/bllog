import { useEditor } from "@tiptap/react"
import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import StarterKit from '@tiptap/starter-kit'
import { TitleInput } from "../components/TitleInput";

const content = "Start writing here..."

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        }
      })
    ],
    content,
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
    await axios.post(`${BACKEND_URL}/api/v1/blog`, blogJSON, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
  }
  return <div>
    <AppBar type="editor" onClick={publishBlog} />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col p-2 mt-6">
        <div className="max-w-3xl">
          <div>
            <TitleInput /> 
          </div>
        </div>
        <div className="flex justify-center max-w-3xl">
          <div>
            <Tiptap editor={editor} />
          </div>
        </div>
      </div>
    </div>
  </div>
}