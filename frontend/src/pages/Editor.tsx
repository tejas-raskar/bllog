import { useEditor } from "@tiptap/react"
import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"
import axios from "axios";
import { BACKEND_URL } from "../config";
import StarterKit from '@tiptap/starter-kit'

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Bllog editor</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`


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
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogJSON, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    }
    return <div>
        <AppBar type="editor" onClick={publishBlog} />
        <div className="flex justify-center">
            <div className="flex justify-center mt-15 max-w-4xl">
                <Tiptap editor={editor}/>
            </div>
        </div>
    </div>
}