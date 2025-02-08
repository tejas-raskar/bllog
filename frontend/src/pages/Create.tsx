import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TitleInput } from "../components/TitleInput";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImage } from "../components/UploadImage";
import { useCustomEditor } from "../hooks/Editor";
import { Image } from "lucide-react";
import { toast } from 'sonner';
import { useBlog } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export const Create = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState(false);
  const [featuredImgUrl, setFeaturedImgUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [blogId, setBlogId] = useState(id || "");
  const navigate = useNavigate();
  const { loading, blog } = useBlog({ id: id as string });
  const editor = useCustomEditor({ setImages: setImages, editable: true });

  useEffect(() => {
    if (blog?.published) {
      navigate(`/blog/${blog.id}`)
    } else {
      if (blog) {
        if (blog.blog) {
          setTitle(blog.title as string);
          setFeaturedImgUrl(blog.featuredImage as string);
          editor?.commands.setContent(blog.blog);
        }
      }
    }
  }, [blog])

  if (loading && id) {
    return <div>
      <AppBar type="main" />
      <div>
        <Skeleton type="blog" />
      </div>
    </div>
  }

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
    await toast.promise(
      saveBlog(),
      {
        loading: 'Saving...',
        success: 'Blog saved',
        error: 'Could not save',
      }
    );
  };

  const handlePublish = async () => {
    await toast.promise(
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
            <UploadImage open={featuredImgUrl ? !featuredImg : featuredImg} url={featuredImgUrl} setUrl={setFeaturedImgUrl} fetchedImg={true} />
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