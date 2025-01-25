import { Typography } from "@material-tailwind/react";
import { CircleSeparator } from "./BlogCard";
import { Image } from "lucide-react";

export const Skeleton = ({ type }: { type: "feed" | "blog" }) => {
    if (type === "feed") {
        return (
            <div className="max-w-full animate-pulse">
                <div className="p-3 w-screen max-w-screen-md">
                    <div className="flex py-2">
                        {/* Avatar */}
                        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-200 rounded-full" />
                        {/* Name */}
                        <div className="flex justify-center flex-col pl-2">
                            <Typography
                                as="div"
                                variant="h1"
                                className="h-3 w-24 rounded-md bg-gray-200"
                                placeholder
                                onPointerEnterCapture
                                onPointerLeaveCapture
                            >
                                &nbsp;
                            </Typography>
                        </div>
                        <div className="flex justify-center flex-col px-2">
                            <CircleSeparator />
                        </div>
                        {/* Date */}
                        <div className="flex justify-center flex-col text-sm font-light text-gray-800">
                            <Typography
                                as="div"
                                variant="h1"
                                className="h-3 w-24 rounded-md bg-gray-200"
                                placeholder
                                onPointerEnterCapture
                                onPointerLeaveCapture
                            >
                                &nbsp;
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col w-full mt-3">
                            <div>
                                <Typography
                                    as="div"
                                    variant="h1"
                                    className="mb-2 h-7 w-full rounded-md bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                            </div>
                            <div className="my-2 mt-3">
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-3 w-full rounded-md bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-3 w-full rounded-md bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-3 w-full rounded-md bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                            </div>
                        </div>
                        <div className="h-36 w-44 p-2 ml-2">
                            <div className="bg-gray-200 text-gray-400 rounded-md w-full h-full flex items-center justify-center">
                                <Image size={36}/>
                            </div>
                        </div>
                    </div>
                    <div className="font-light text-gray-800 pt-6 pb-2">
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-3 w-20 rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <hr />
                </div>
            </div>
        );
    } else {
        return <div className="flex justify-center animate-pulse max-w-full">
            <div className="grid grid-cols-12 px-10 lg:px-20 pt-10 w-full max-w-screen-xl">
                <div className="col-span-12 lg:col-span-9">
                    <div className="pb-2">
                        <Typography
                            as="div"
                            variant="h1"
                            className="mb-2 h-7 max-w-xl rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-7 max-w-xl rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <div className="flex pb-4">
                        <span className="font-medium text-gray-600"><Typography
                            as="div"
                            variant="h1"
                            className="h-3 w-32 rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography></span>
                        <div className="flex flex-col justify-center mx-2"><CircleSeparator /></div>
                        <span className="font-medium text-gray-400"><Typography
                            as="div"
                            variant="h1"
                            className="h-3 w-32 rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography></span>
                    </div>

                    <div className="text-base text-gray-700">
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-xl rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-xl rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-xl rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                </div>
                <div className="hidden lg:col-span-3 lg:block">
                    <div className="sticky top-8">
                        <div className="font-bold text-md my-2">
                            On this page
                        </div>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="my-2 h-3 max-w-sm rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="my-2 h-3 max-w-sm rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="my-2 h-3 max-w-sm rounded-md bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    }
}