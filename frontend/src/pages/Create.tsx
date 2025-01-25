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
import toast from 'react-hot-toast';

export const Create = () => {
  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState(false);
  const [featuredImgUrl, setFeaturedImgUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [blogId, setBlogId] = useState("");
  const navigate = useNavigate();
  const editor = useCustomEditor({ setImages: setImages, editable: true });

  if (!editor) {
    return null
  }
  async function saveBlog() {
    if (!editor) return
    const blogJSON = editor.getJSON();
    const blogTitle = title;
    const data = {
      title: blogTitle,
      blog: blogJSON,
      featuredImage: featuredImgUrl,
      images: images,
      published: false,
      modifiedOn: new Date().toISOString(),
    }
    console.log(featuredImgUrl)
    try {
      const res = blogId ? await axios.put(`${BACKEND_URL}/api/v1/blog/${blogId}`, data,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
        : await axios.post(`${BACKEND_URL}/api/v1/blog`, data,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
      if (res.status === 200) {
        setBlogId(res.data.id);
        return Promise.resolve();
      }
    } catch (e) {
      return Promise.reject();
    }
  }

  async function publishBlog() {
    if (!editor) return
    const blogJSON = editor.getJSON();
    const blogTitle = title;
    const data = {
      title: blogTitle,
      blog: blogJSON,
      featuredImage: featuredImgUrl,
      images: images,
      published: true,
      publishedOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
    }
    try {
      const res = blogId ? await axios.put(`${BACKEND_URL}/api/v1/blog/${blogId}`, data,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }) : await axios.post(`${BACKEND_URL}/api/v1/blog`,
          data,
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
      Promise.reject(e);
    }
  }

  const handleSave = async () => {
    return toast.promise(
      saveBlog(),
      {
        loading: 'Saving...',
        success: 'Blog saved',
        error: 'Could not save',
      }
    );
  };

  const handlePublish = async () => {
    return toast.promise(
      publishBlog(),
      {
        loading: 'Publishing...',
        success: 'Published!',
        error: 'Could not publish',
      }
    );
  };

  return <div>
    <AppBar type="editor" publish={handlePublish} save={handleSave} editor={editor} />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col p-2 mt-6">
        <div className="max-w-3xl">
          <div>
            <UploadImage open={featuredImg} url={featuredImgUrl} setUrl={setFeaturedImgUrl} />
          </div>
          {!featuredImg || !featuredImgUrl ? (
            <button onClick={() => setFeaturedImg(!featuredImg)} className="ml-4 p-1 rounded-md hover:bg-gray-200">
              <div className="flex">
                <div className="flex justify-center flex-col">
                  <Image size={16} />
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