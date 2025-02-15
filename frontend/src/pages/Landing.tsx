import { Bold, Bookmark, Code, FilePenLine, Github, Heading, Heart, MonitorSmartphone, MousePointer2, Quote, Sparkles, PenLine, Image } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

const FloatingIcons = () => {
    const iconAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 0.1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none w-full max-h-[70%] mt-20 hidden md:block">
            <motion.div 
                initial="initial" 
                animate="animate" 
                className="relative w-full h-full max-w-5xl mx-auto px-20"
            >
                <motion.div variants={iconAnimation} className="absolute top-[15%] left-[5%] md:left-[10%] lg:left-[5%]">
                    <PenLine size={32} />
                </motion.div>
                <motion.div variants={iconAnimation} className="absolute top-[35%] left-[10%] md:left-[15%] lg:left-[10%]">
                    <Bold size={32} />
                </motion.div>
                <motion.div variants={iconAnimation} className="absolute top-[35%] right-[10%] md:right-[15%] lg:right-[10%]">
                    <Heading size={32} />
                </motion.div>
                <motion.div variants={iconAnimation} className="absolute top-[15%] right-[5%] md:right-[10%] lg:right-[5%]">
                    <Quote size={32} />
                </motion.div>
                <motion.div variants={iconAnimation} className="absolute top-[55%] left-[5%] md:left-[10%] lg:left-[5%]">
                    <Image size={32} />
                </motion.div>
                <motion.div variants={iconAnimation} className="absolute top-[55%] right-[5%] md:right-[10%] lg:right-[5%]">
                    <Code size={32} />
                </motion.div>
            </motion.div>
        </div>
    );
};

const GradientBlob = ({ className = "" }) => (
    <div className={`absolute -z-10 h-full w-full ${className}`}>
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[400px] w-[400px] md:h-[500px] md:w-[500px] -translate-x-[50%] md:translate-x-[0%] -translate-y-[10%] rounded-full opacity-35 blur-[80px] bg-gradient-to-br from-[#FF8C4B] to-[#BEA1FA]" />
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-[20%] translate-y-[20%] hidden md:block rounded-full opacity-35 blur-[80px] bg-gradient-to-tr from-[#BEA1FA] to-[#FF8C4B]" />
    </div>
);

export const Landing = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    };

    const fadeInUpDelayed = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    };

    const imageSlideUp = {
        initial: { opacity: 0, y: 100 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: {
            duration: 1.2,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    };

    const staggerChildren = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { staggerChildren: 0.2 }
    };

    const cardHoverAnimation = {
        whileHover: {
            y: -5,
            transition: { duration: 0.2 }
        }
    };

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
                    <div className="flex">
                        <a href="https://github.com/tejas-raskar/bllog  "
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2 hover:text-gray-900 transition-colors flex items-center gap-1">
                            <Github size={18} />
                        </a>
                        <div className="my-auto">
                            <button onClick={() => navigate('/signin')} className="mr-2 border-2 rounded-full px-4 py-2 shadow-sm">
                                Log in
                            </button>
                            <button onClick={() => navigate('/signup')} className="border-2 rounded-full px-4 py-2 shadow-sm bg-[#BEA1FA]">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-36 p-10">
            <div className="flex flex-col items-center">
                <div className="absolute top-0 -z-10 h-full w-full bg-white">
                    <GradientBlob />
                </div>
                <FloatingIcons />
                <motion.div className="max-w-3xl relative" {...fadeInUp}>

                    <div className="mx-auto font-headline text-5xl md:text-6xl text-balance max-w-xl text-center leading-tight font-semibold">
                        Effortlessly publish bllogs in{" "}
                        <span className="relative inline-block highlight">
                            minutes
                        </span>
                    </div>
                    <div className="mt-4 text-center text-xl text-balance font-subtitle font-light">
                        Start blogging without the hassle. Focus on your story, not the setup.
                    </div>
                    <motion.div className="flex justify-center mt-6" {...fadeInUpDelayed}>
                        <button onClick={() => navigate('/signup')} className="mx-2 bg-[#BEA1FA] border-2 hover:bg-white hover:border-2 border-[#BEA1FA] rounded-full px-4 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#BEA1FA]/20">
                            Get started
                        </button>
                        <button onClick={() => navigate('/try-editor')} className="mx-2 hover:bg-[#BEA1FA] border-2 bg-white hover:border-2 border-[#BEA1FA] rounded-full px-4 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#BEA1FA]/20">
                            Try Editor
                        </button>
                    </motion.div>
                </motion.div>
                <motion.div {...imageSlideUp}>
                    <img src="/assets/blog.png" className="scale-75 rounded-xl ring-gray-200 ring-2 filter drop-shadow-2xl" />
                </motion.div>
                <div className="relative">
                    <GradientBlob />
                    <motion.div className="max-w-5xl w-full bg-gray-100/80 rounded-xl p-2 pb-4 backdrop-blur-xl" {...fadeInUpDelayed}>
                        <div className="bg-[#FF8C4B] font-bold rounded-full w-fit py-1 px-2 mt-4 mx-auto">
                            <div className="flex justify-center gap-2">
                                <FilePenLine size={16} className="my-auto" />
                                <div className="text-sm font-subtitle">
                                    The Editor
                                </div>
                            </div>
                        </div>
                        <div className="font-headline font-bold text-3xl text-center mt-4">
                            So Easy, It's Scary
                        </div>
                        <div className="font-subtitle text-lg text-center">
                            We're not responsible for sudden fame
                        </div>
                        <motion.div className="grid grid-cols-12 mt-4" variants={staggerChildren} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}>
                            <div className="p-4 col-span-12">
                                <video src="/assets/editor_vid.mp4" controls className="rounded-xl w-full">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-4 col-span-12 gap-4">
                                <motion.div className="md:col-span-1 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8 pb-0">
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Markdown editor
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            Markdown for pros, or WYSIWYG for the rest of us!
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/markdown.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110 translate-y-6 w-[90%] object-cover" />
                                    </div>
                                </motion.div>
                                <motion.div className="md:col-span-1 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-fullhover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8 pb-0">
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Table of Contents
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            Click to jump to a section. Updates automatically
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/toc.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110  translate-y-6 w-[90%] object-cover" />
                                    </div>
                                </motion.div>

                                <motion.div className="md:col-span-2 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-fullhover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8 pb-0">
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Advanced blocks
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            All the fancy blocks you crave, without the headache
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/adv_blocks.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110 translate-y-6 w-[90%] object-cover" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative">
                    <GradientBlob className="top-[10%]" />
                    <motion.div className="max-w-5xl w-full bg-gray-100/80 rounded-xl p-2 pb-4 mt-20" {...fadeInUp}>
                        <div className="bg-[#BEA1FA] font-bold rounded-full w-fit py-1 px-2 mt-4 mx-auto">
                            <div className="flex justify-center gap-2">
                                <Sparkles size={16} className="my-auto" />
                                <div className="text-sm font-subtitle">
                                    The Conveniences
                                </div>
                            </div>
                        </div>
                        <div className="font-headline font-bold text-3xl text-center mt-4">
                            Because Life's Too Short
                        </div>
                        <div className="font-subtitle text-lg text-center">
                            For complicated stuff, that is
                        </div>
                        <div className="grid grid-cols-12 mt-4">
                            <div className="p-4 col-span-12">
                                <video src="/assets/convenience_vid.mp4" controls className="rounded-xl w-full">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-4 col-span-12 gap-4">
                                <motion.div className="md:col-span-1 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8">
                                        <MousePointer2 className="mb-2" />
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Drag & Drop Images
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            Just drag, drop, and boom! Your images are live.
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div className="md:col-span-1 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8">
                                        <Bookmark className="mb-2" />
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Smart Bookmarks
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            Save your spot, pick up where you left off. Magic!
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div className="md:col-span-2 lg:col-span-4 bg-gray-200 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-8">
                                        <MonitorSmartphone className="mb-2" />
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Sync Everywhere
                                        </div>
                                        <div className="font-subtitle text-lg text-gray-800">
                                            Write from anywhere, your words follow you everywhere
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div {...fadeInUp}>
                    <div className="max-w-5xl w-full rounded-xl p-8 mt-28 text-center">
                        <div className="font-headline font-bold text-4xl">
                            Ready to unleash your inner wordsmith?
                        </div>
                        <div className="font-subtitle text-lg mt-4">
                            Stop waiting, start writing. Your audience awaits!
                        </div>
                        <button onClick={() => navigate('/signup')} className="mt-6 bg-[#BEA1FA] font-bold rounded-full px-8 py-3 text-lg hover:bg-[#a87cff]">
                            Sign Up - It's Free!
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
        <div className="w-full bg-gray-50/50 backdrop-blur-sm border-t border-gray-100 mt-28">
            <div className="flex justify-center gap-2 py-3 text-gray-600">
                Made with <Heart size={18} className="my-auto hover:text-red-500 transition-colors" /> from Earth!
            </div>
        </div>
    </div>
}