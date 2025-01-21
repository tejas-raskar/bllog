import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TitleInput } from "../components/TitleInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "../components/UploadImage";
import { useCustomEditor } from "../hooks/Editor";
import { Image } from "lucide-react";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState(false);
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const editor = useCustomEditor({ setImages: setImages, editable: true });

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
    <AppBar type="editor" onClick={publishBlog} editor={editor} username={localStorage.getItem("username") as string} />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col p-2 mt-6">
        <div className="max-w-3xl">
          <div>
            <UploadImage open={featuredImg} url={url} setUrl={setUrl} />
          </div>
          {!featuredImg || !url ? (
            <button onClick={() => setFeaturedImg(!featuredImg)} className="ml-4 p-1 rounded-md hover:bg-gray-200">
              <div className="flex">
                <div className="flex justify-center flex-col">
                  <Image size={16}/>
                </div>
                <div className="pl-1 tracking-tighter text-sm text-gray-700">
                  {featuredImg ? 'Remove featured image' : 'Add featured image'}
                </div>
              </div>
            </button>
          ) : null}
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