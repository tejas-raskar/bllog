import { FilePenLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"

export const Landing = () => {
    const navigate = useNavigate();
    return <div>
        <div className="px-5 pt-5 fixed top-0 w-full z-50">
            <div className="rounded-full max-w-xl lg:max-w-5xl mx-auto border-2 backdrop-blur-lg shadow-sm">
                <div className="flex justify-between px-3 py-2 pl-6">
                    <div className="flex flex-col justify-center lg:ml-3">
                        <Link to={'/'}>
                            <div className="font-logo text-5xl">
                                Bllog
                            </div>
                        </Link>
                    </div>
                    <div className="my-auto">
                        <button onClick={() => navigate('/signin')} className="border-2 rounded-full px-4 py-2 shadow-sm">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-36 p-10">
            <div className="flex flex-col items-center">
                <div className="max-w-3xl">
                    <div className="mx-auto font-headline text-5xl md:text-6xl text-balance max-w-xl text-center leading-tight font-semibold">
                        Effortlessly publish bllogs in{" "}
                        <span className="relative inline-block highlight">
                            minutes
                        </span>
                    </div>
                    <div className="mt-4 text-center text-xl text-balance font-subtitle font-light">
                        Start blogging without the hassle. Focus on your story, not the setup.
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="mx-2 bg-[#BEA1FA] border-2 hover:bg-white hover:border-2 border-[#BEA1FA] rounded-full px-4 py-3 text-lg font-subtitle font-semibold">
                            Get started
                        </button>
                        <button className="mx-2 border-2 border-[#BEA1FA] hover:bg-[#BEA1FA] rounded-full px-4 py-3  text-lg font-subtitle font-semibold">
                            Try Editor
                        </button>
                    </div>
                </div>
                <div>
                    <img src="/assets/blog.png" className="scale-75 rounded-xl ring-gray-200 ring-2 filter drop-shadow-2xl" />
                </div>
                <div className="max-w-5xl w-full bg-gray-100 rounded-xl p-2">
                    <div className="bg-gray-400 rounded-full w-fit py-1 px-2 mx-auto">
                        <div className="flex justify-center gap-2">
                            <FilePenLine size={16} className="my-auto" />
                            <div className="text-sm font-subtitle">
                                The Editor
                            </div>
                        </div>
                    </div>
                    <div className="font-headline font-bold text-2xl text-center mt-4">
                        Simple Yet Powerful Editor
                    </div>
                    <div className="font-subtitle text-base text-center">
                        Powerful doesn't always have to be complicated
                    </div>
                </div>
            </div>
        </div>

        <div>
            Rich Text Editor
            Drag drop
            bookmarks
            cta
        </div>
    </div>
}