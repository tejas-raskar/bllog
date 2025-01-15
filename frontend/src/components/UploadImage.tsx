import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

export const UploadImage = ({ open, url, setUrl }: { open: boolean, url: string, setUrl: React.Dispatch<React.SetStateAction<string>> }) => {
    const [submitted, setSubmitted] = useState(false);
    const onChange = ({ target }: { target: any }) => setUrl(target.value);
    if (submitted && url) {
        return <div className="max-h-64 overflow-clip rounded-md">
            <button onClick={() => setUrl('')} className="absolute" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
            <img src={url} className="object-cover h-64 w-full"/>
        </div>
    }
    return (open && <div className="flex justify-center my-5 bg-gray-100 min-h-28 rounded-md">
        <div className="flex flex-col justify-center w-full max-w-[24rem]">
            <div className="relative flex rounded-md bg-white">
                <Input
                    type="url"
                    label="Image URL"
                    placeholder="https://"
                    value={url}
                    onChange={onChange}
                    className="pr-20"
                    containerProps={{
                        className: "min-w-0",
                    }}
                    onPointerEnterCapture
                    onPointerLeaveCapture 
                    crossOrigin
                />
                <Button
                    size="sm"
                    color={url ? "gray" : "blue-gray"}
                    disabled={!url}
                    onClick={() => setSubmitted(true)}
                    className="!absolute right-1 top-1 rounded"
                    placeholder
                    onPointerEnterCapture 
                    onPointerLeaveCapture
                >
                    Add
                </Button>
            </div>
        </div>
    </div>)
}