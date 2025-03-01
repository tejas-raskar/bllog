import { ChangeEvent, useEffect, useRef} from "react";
import { TitleGenerator } from "./TitleGenerator"; // Add this import

export const TitleInput = ({ title, setTitle, editor }: {title: string, setTitle:any, editor?: any}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [title]);

    return (
        <div className='flex justify-between'>
            <textarea
                maxLength={150}
                placeholder="Article Title"
                className="font-headline font-extrabold text-4xl text-wrap p-4 w-full focus:outline-none resize-none"
                value={title}
                onChange={handleChange}
                rows={1}
                ref={textAreaRef}
            ></textarea>            
            <div className="m-auto">
                {editor && <TitleGenerator editor={editor} setTitle={setTitle} currentTitle={title} />}
            </div>
        </div>
    );
};

