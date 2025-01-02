import { EditorContent, BubbleMenu, Editor, FloatingMenu } from '@tiptap/react'
import { FloatingMenuItem } from './FloatingMenuItem';

export const Tiptap = ({ editor }: { editor: Editor }) => {
  if (!editor) return;
  return (
    <>
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
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${editor.isActive('underline') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M4.75 2a.75.75 0 0 1 .75.75V9a4.5 4.5 0 1 0 9 0V2.75a.75.75 0 0 1 1.5 0V9A6 6 0 0 1 4 9V2.75A.75.75 0 0 1 4.75 2ZM2 17.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${editor.isActive('strike') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M11.617 3.963c-1.186-.318-2.418-.323-3.416.015-.992.336-1.49.91-1.642 1.476-.152.566-.007 1.313.684 2.1.528.6 1.273 1.1 2.128 1.446h7.879a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h3.813a5.976 5.976 0 0 1-.447-.456C5.18 7.479 4.798 6.231 5.11 5.066c.312-1.164 1.268-2.055 2.61-2.509 1.336-.451 2.877-.42 4.286-.043.856.23 1.684.592 2.409 1.074a.75.75 0 1 1-.83 1.25 6.723 6.723 0 0 0-1.968-.875Zm1.909 8.123a.75.75 0 0 1 1.015.309c.53.99.607 2.062.18 3.01-.421.94-1.289 1.648-2.441 2.038-1.336.452-2.877.42-4.286.043-1.409-.377-2.759-1.121-3.69-2.18a.75.75 0 1 1 1.127-.99c.696.791 1.765 1.403 2.952 1.721 1.186.318 2.418.323 3.416-.015.853-.288 1.34-.756 1.555-1.232.21-.467.205-1.049-.136-1.69a.75.75 0 0 1 .308-1.014Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${editor.isActive('listItem') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className={`${editor.isActive('code') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </BubbleMenu>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'bottom-start', animation: 'scale-subtle' }}>
        <div className='flex flex-col overflow-auto max-h-72 max-w-fit bg-white border border-gray-400 rounded-md divide-y divide-gray-200 shadow-sm px-2 py-2'>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 1' description='Big heading' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M2.75 4a.75.75 0 0 1 .75.75v4.5h5v-4.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-1.5 0v-4.5h-5v4.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 2.75 4ZM13 8.75a.75.75 0 0 1 .75-.75h1.75a.75.75 0 0 1 .75.75v5.75h1a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5h1v-5h-1a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>} />
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 2' description='Medium heading' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M2.75 4a.75.75 0 0 1 .75.75v4.5h5v-4.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-1.5 0v-4.5h-5v4.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 2.75 4ZM15 9.5c-.729 0-1.445.051-2.146.15a.75.75 0 0 1-.208-1.486 16.887 16.887 0 0 1 3.824-.1c.855.074 1.512.78 1.527 1.637a17.476 17.476 0 0 1-.009.931 1.713 1.713 0 0 1-1.18 1.556l-2.453.818a1.25 1.25 0 0 0-.855 1.185v.309h3.75a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-1.059a2.75 2.75 0 0 1 1.88-2.608l2.454-.818c.102-.034.153-.117.155-.188a15.556 15.556 0 0 0 .009-.85.171.171 0 0 0-.158-.169A15.458 15.458 0 0 0 15 9.5Z" clip-rule="evenodd" />
            </svg>} />
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 3' description='Small heading' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M2.75 4a.75.75 0 0 1 .75.75v4.5h5v-4.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-1.5 0v-4.5h-5v4.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 2.75 4ZM15 9.5c-.73 0-1.448.051-2.15.15a.75.75 0 1 1-.209-1.485 16.886 16.886 0 0 1 3.476-.128c.985.065 1.878.837 1.883 1.932V10a6.75 6.75 0 0 1-.301 2A6.75 6.75 0 0 1 18 14v.031c-.005 1.095-.898 1.867-1.883 1.932a17.018 17.018 0 0 1-3.467-.127.75.75 0 0 1 .209-1.485 15.377 15.377 0 0 0 3.16.115c.308-.02.48-.24.48-.441L16.5 14c0-.431-.052-.85-.15-1.25h-2.6a.75.75 0 0 1 0-1.5h2.6c.098-.4.15-.818.15-1.25v-.024c-.001-.201-.173-.422-.481-.443A15.485 15.485 0 0 0 15 9.5Z" clip-rule="evenodd" />
            </svg>} />
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Bullet List' description='Simple bullet list' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            } />
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Numbered List' description='Simple numbered list' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
            </svg>
            } />
          </button>

          <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Divider' description='Insert a line dividing sections' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
            } />
          </button>

          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Code' description='Add a code block' icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fill-rule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clip-rule="evenodd" />
            </svg>
            } />
          </button>

          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Quote' description='Add a beautiful quote' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            } />
          </button>
        </div>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </>
  )
}
