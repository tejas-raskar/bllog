import { EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { FloatingMenuItem } from './FloatingMenuItem';
import { Bold, Code, Code2, Heading1, Heading2, Heading3, Italic, List, ListOrdered, MessageCircle, Minus, Strikethrough,Underline } from 'lucide-react';

export const Tiptap = ({ editor }: { editor: Editor }) => {
  if (!editor) return;
  return (
    <>
      <BubbleMenu editor={editor}>
        <div className='bg-white border flex justify-center border-gray-400 rounded-md divide-x divide-gray-200 shadow-sm p-1'>
          <button onClick={() => editor.chain().focus().toggleMark('bold').run()} className={`${editor.isActive('bold') ? 'bg-gray-200 hover:bg-gray-300' : ''}flex flex-col justify-center p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Bold size={18}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleMark('italic').run()} className={`${editor.isActive('italic') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Italic size={18}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${editor.isActive('underline') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Underline size={18}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleMark('strike').run()} className={`${editor.isActive('strike') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Strikethrough size={18}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleList('bulletList', 'listItem').run()} className={`${editor.isActive('listItem') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <List size={18}/>
          </button>
          <button onClick={() => editor.chain().focus().toggleMark('code').run()} className={`${editor.isActive('code') ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <Code size={18}/>
          </button>
        </div>
      </BubbleMenu>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'bottom-start', animation: 'scale-subtle' }}>
        <div className='flex flex-col overflow-auto max-h-72 max-w-fit bg-white border border-gray-400 rounded-md divide-y divide-gray-200 shadow-sm px-2 py-2'>
          <button onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph',{ level: 1 }).run()} className={`${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 1' description='Big heading' icon={ <Heading1 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph',{ level: 2 }).run()} className={`${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 2' description='Medium heading' icon={ <Heading2 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph',{ level: 3 }).run()} className={`${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 hover:bg-gray-300' : ''} p-2 mx-0.5 hover:bg-gray-200 rounded-md`}>
            <FloatingMenuItem title='Heading 3' description='Small heading' icon={ <Heading3 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleList('bulletList', 'listItem').run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Bullet List' description='Simple bullet list' icon={ <List size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleList('orderedList', 'listItem').run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Numbered List' description='Simple numbered list' icon={ <ListOrdered size={20}/> } />
          </button>

          <button onClick={() => editor.commands.setHorizontalRule()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Divider' description='Insert a line dividing sections' icon={ <Minus size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleNode('codeBlock', 'paragraph').run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Code' description='Add a code block' icon={ <Code2 size={20}/> } />
          </button>

          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="p-2 mx-0.5 hover:bg-gray-200 rounded-md">
            <FloatingMenuItem title='Quote' description='Add a beautiful quote' icon={ <MessageCircle size={20}/> } />
          </button>
        </div>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </>
  )
}
