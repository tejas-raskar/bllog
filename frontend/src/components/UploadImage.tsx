import { Button, Input } from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";

export const UploadImage = ({ open, url, setUrl, fetchedImg=false }: { open: boolean, url: string, setUrl: React.Dispatch<React.SetStateAction<string>>, fetchedImg?: boolean}) => {
    const [submitted, setSubmitted] = useState(fetchedImg);
    const onChange = ({ target }: { target: any }) => setUrl(target.value);
    if (submitted && url) {
        return <div className="max-h-64 overflow-clip rounded-md">
            <button onClick={() => setUrl('')} className="absolute" >
                <div className="text-white hover:bg-gray-700 rounded-md m-1">
                    <X />
                </div>
            </button>
            <img src={url} className="object-cover h-64 w-full" />
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