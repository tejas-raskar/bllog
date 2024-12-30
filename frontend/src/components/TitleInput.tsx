import { ChangeEvent, useEffect, useRef, useState } from "react";

export const TitleInput = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [val, setVal] = useState("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setVal(e.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [val]);

    return (
        <div className=''>
            <textarea
                maxLength={150}
                placeholder="Article Title"
                className="font-bold text-3xl text-wrap p-4 w-full focus:outline-none resize-none"
                value={val}
                onChange={handleChange}
                rows={1}
                ref={textAreaRef}
            ></textarea>
        </div>
    );
};

