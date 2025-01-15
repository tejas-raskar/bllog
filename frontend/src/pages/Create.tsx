import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TitleInput } from "../components/TitleInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "../components/UploadImage";
import { useCustomEditor } from "../hooks/Editor";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState(false);
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const editor = useCustomEditor({ setImages });

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
          blog: blogJSON,
          featuredImg: url,
          images: images,
          published: true
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
            <UploadImage open={featuredImg} url={url} setUrl={setUrl} />
          </div>
          {featuredImg ? null : <button onClick={() => setFeaturedImg(!featuredImg)} className="ml-4 p-1 rounded-md hover:bg-gray-200">
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
          </button>}
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