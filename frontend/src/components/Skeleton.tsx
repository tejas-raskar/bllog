import { Typography } from "@material-tailwind/react";
import { CircleSeparator } from "./BlogCard";

export const Skeleton = ({ type }: { type: "feed" | "blog" }) => {
    if (type === "feed") {
        return (
            <div className="max-w-full animate-pulse">
                <div className="p-3 w-screen max-w-screen-md">
                    <div className="flex py-2">
                        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-200 rounded-full" />
                        <div className="flex justify-center flex-col pl-2">
                            <Typography
                                as="div"
                                variant="h1"
                                className="h-3 w-24 rounded-full bg-gray-200"
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
                        <div className="flex justify-center flex-col text-sm font-light text-gray-800">
                            <Typography
                                as="div"
                                variant="h1"
                                className="h-3 w-24 rounded-full bg-gray-200"
                                placeholder
                                onPointerEnterCapture
                                onPointerLeaveCapture
                            >
                                &nbsp;
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography
                            as="div"
                            variant="h1"
                            className="mb-2 h-5 w-full rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <div className="py-2">
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-full rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-full rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-full rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <div className="font-light text-gray-800 pt-6 pb-2">
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-3 w-20 rounded-full bg-gray-200"
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
                            className="mb-2 h-7 max-w-xl rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-7 max-w-xl rounded-full bg-gray-200"
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
                            className="h-3 w-32 rounded-full bg-gray-200"
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
                            className="h-3 w-32 rounded-full bg-gray-200"
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
                            className="mb-2 h-2 max-w-xl rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-xl rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-xl rounded-full bg-gray-200"
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
                            className="my-2 h-3 max-w-sm rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="my-2 h-3 max-w-sm rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="my-2 h-3 max-w-sm rounded-full bg-gray-200"
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