import { TextSelection } from '@tiptap/pm/state'
import { Editor } from '@tiptap/core'
import React from 'react'
import { Dot } from 'lucide-react';

interface ToCItemProps {
  item: {
    id: string;
    isActive: boolean;
    isScrolledOver: boolean;
    level: number;
    itemIndex: number;
    textContent: string;
  };
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const ToCItem: React.FC<ToCItemProps> = ({ item, onItemClick }) => {
    return (
      <div className={`${item.isActive ? 'text-black' : 'text-gray-500'} ${item.isScrolledOver ? 'text-black' : ''} my-1`} style={{
        paddingLeft: `calc(0.875rem * ${item.level})`,
      }}>
        <a href={`#${item.id}`} onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}><div className='flex font-subtitle'><Dot />{item.textContent}</div></a>
      </div>
    )
  }
  
  export const ToCEmptyState = () => {
    return (
      <div className="select-none text-gray-600">
        <p>Nothing to show here</p>
      </div>
    )
  }
  
  export const ToC = ({
    items = [],
    editor,
  }: {editor: Editor, items: Array<{ id: string; isActive: boolean; isScrolledOver: boolean; level: number; itemIndex: number; textContent: string; }>}) => {
    if (items.length === 0) {
      return <ToCEmptyState />
    }
  
    const onItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
  
      if (editor) {
        const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`) as HTMLElement
        const pos = editor.view.posAtDOM(element, 0)
  
        // set focus
        const tr = editor.view.state.tr
  
        tr.setSelection(new TextSelection(tr.doc.resolve(pos)))
  
        editor.view.dispatch(tr)
  
        editor.view.focus()
  
        if (history.pushState) {
          history.pushState(null, '', `#${id}`) 
        }
  
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        })
      }
    }
  
    return (
      <>
        {items.map((item) => (
          <ToCItem onItemClick={onItemClick} key={item.id} item={item} />
        ))}
      </>
    )
  }          
