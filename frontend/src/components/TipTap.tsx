// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [StarterKit]


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

export const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
      }
    }
    
  })

  if(!editor) {
    return null
  }

  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>
        <div className='bg-white border border-gray-400 rounded-md divide-x divide-gray-200 shadow-sm p-1'>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M4 3a1 1 0 0 1 1-1h6a4.5 4.5 0 0 1 3.274 7.587A4.75 4.75 0 0 1 11.25 18H5a1 1 0 0 1-1-1V3Zm2.5 5.5v-4H11a2 2 0 1 1 0 4H6.5Zm0 2.5v4.5h4.75a2.25 2.25 0 0 0 0-4.5H6.5Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M8 2.75A.75.75 0 0 1 8.75 2h7.5a.75.75 0 0 1 0 1.5h-3.215l-4.483 13h2.698a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3.215l4.483-13H8.75A.75.75 0 0 1 8 2.75Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${editor.isActive('strike') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M11.617 3.963c-1.186-.318-2.418-.323-3.416.015-.992.336-1.49.91-1.642 1.476-.152.566-.007 1.313.684 2.1.528.6 1.273 1.1 2.128 1.446h7.879a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h3.813a5.976 5.976 0 0 1-.447-.456C5.18 7.479 4.798 6.231 5.11 5.066c.312-1.164 1.268-2.055 2.61-2.509 1.336-.451 2.877-.42 4.286-.043.856.23 1.684.592 2.409 1.074a.75.75 0 1 1-.83 1.25 6.723 6.723 0 0 0-1.968-.875Zm1.909 8.123a.75.75 0 0 1 1.015.309c.53.99.607 2.062.18 3.01-.421.94-1.289 1.648-2.441 2.038-1.336.452-2.877.42-4.286.043-1.409-.377-2.759-1.121-3.69-2.18a.75.75 0 1 1 1.127-.99c.696.791 1.765 1.403 2.952 1.721 1.186.318 2.418.323 3.416-.015.853-.288 1.34-.756 1.555-1.232.21-.467.205-1.049-.136-1.69a.75.75 0 0 1 .308-1.014Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </BubbleMenu>
    </>
  )
}
