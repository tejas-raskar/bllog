import { EditorContent, BubbleMenu, Editor, FloatingMenu } from '@tiptap/react'
import { FloatingMenuItem } from './FloatingMenuItem';
import { Bold, BoldIcon, Code, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Strikethrough, Underline } from 'lucide-react';

export const Tiptap = ({ editor }: { editor: Editor }) => {
  if (!editor) return;
  return (
    <>
      <BubbleMenu editor={editor}>
        <div className='bg-white border flex justify-center border-gray-400 rounded-md divide-x divide-gray-200 shadow-sm p-1'>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') ? 'bg-gray-200 hover:bg-gray-300' : ''}flex flex-col justify-center p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Bold size={22}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Italic size={22}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${editor.isActive('underline') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Underline size={22}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${editor.isActive('strike') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Strikethrough size={22}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${editor.isActive('listItem') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <List size={22}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className={`${editor.isActive('code') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Code size={22}/>
          </button>
        </div>
      </BubbleMenu>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'bottom-start', animation: 'scale-subtle' }}>
        <div className='flex flex-col overflow-auto max-h-72 max-w-fit bg-white border border-gray-400 rounded-md divide-y divide-gray-200 shadow-sm px-2 py-2'>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 1' description='Big heading' icon={ <Heading1 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 2' description='Medium heading' icon={ <Heading2 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 3' description='Small heading' icon={ <Heading3 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Bullet List' description='Simple bullet list' icon={ <List size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Numbered List' description='Simple numbered list' icon={ <ListOrdered size={20}/> } />
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
