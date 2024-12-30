import { ChangeEvent, useEffect, useRef} from "react";

export const TitleInput = ({ title, setTitle }: {title: string, setTitle:any}) => {
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
        <div className=''>
            <textarea
                maxLength={150}
                placeholder="Article Title"
                className="font-extrabold text-4xl text-wrap p-4 w-full focus:outline-none resize-none"
                value={title}
                onChange={handleChange}
                rows={1}
                ref={textAreaRef}
            ></textarea>
        </div>
    );
};

