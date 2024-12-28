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
                                className="h-3 w-32 rounded-full bg-gray-200"
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
                                className="h-3 w-32 rounded-full bg-gray-200"
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
                            className="mb-2 h-5 max-w-md rounded-full bg-gray-200"
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
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
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
                            className="h-3 w-32 rounded-full bg-gray-200"
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
            <div className="grid grid-cols-12 px-20 pt-10 w-full max-w-screen-xl">
                <div className="col-span-9">
                    <div className="pb-2">
                        <Typography
                            as="div"
                            variant="h1"
                            className="mb-2 h-7 max-w-lg rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-7 max-w-lg rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <div className="font-medium text-gray-400 pb-6">
                        <Typography
                            as="div"
                            variant="h1"
                            className="h-3 w-32 rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                    <div className="text-base text-gray-700">
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
                            placeholder
                            onPointerEnterCapture
                            onPointerLeaveCapture
                        >
                            &nbsp;
                        </Typography>
                    </div>
                </div>
                <div className="col-span-3 bg-white">
                    <div className="font-medium text-gray-600 mb-2">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex justify-center flex-col pr-4">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full" />
                        </div>
                        <div>
                            <div className="font-bold text-xl">
                                <Typography
                                    as="div"
                                    variant="h1"
                                    className="h-3 w-32 rounded-full bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                            </div>
                            <div className="font-medium text-gray-400 mt-2">
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-1 h-2 max-w-md rounded-full bg-gray-200"
                                    placeholder
                                    onPointerEnterCapture
                                    onPointerLeaveCapture
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 max-w-md rounded-full bg-gray-200"
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
            </div>
        </div>
    }
}