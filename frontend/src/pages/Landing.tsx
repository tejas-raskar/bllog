import { Bold, Bookmark, Code, FilePenLine, Github, Heading, Heart, MonitorSmartphone, MousePointer2, Quote, Sparkles, PenLine, Image, Sparkle, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { PeerlistLaunchBadge } from "../components/PeerlistLaunchBadge";

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
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[400px] w-[400px] md:h-[500px] md:w-[500px] -translate-x-[50%] md:translate-x-[0%] -translate-y-[10%] rounded-full opacity-15 blur-3xl bg-gradient-to-br from-[#FF8C4B] to-[#FF8C4B]" />
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] md:h-[500px] md:w-[500px] -translate-x-[20%] translate-y-[20%] hidden md:block rounded-full opacity-15 blur-3xl bg-gradient-to-tr from-[#BEA1FA] to-[#BEA1FA]" />
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
                            aria-label="GitHub Repository"
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
        <div className="flex justify-center mt-36">
            <div className="flex flex-col items-center">
                <div className="absolute top-0 -z-10 h-full w-full bg-white">
                    <GradientBlob />
                </div>
                <FloatingIcons />

                <motion.div
                    className="relative mb-5"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF8C4B] via-[#e57dff] to-[#BEA1FA] blur-sm opacity-80"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 8,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        style={{
                            backgroundSize: "200% 200%",
                        }}
                    />
                    <div className="relative group">
                        <div className="font-subtitle text-md text-center bg-black text-white px-4 py-1.5 rounded-full border border-gray-800 flex items-center justify-center gap-2 transition-all">
                            <div className="relative mr-0.5">
                                <Sparkle size={15} className="-translate-x-1 -translate-y-1 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
                                <Sparkle size={11} className="absolute -bottom-0.5 -right-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
                                <svg width="0" height="0">
                                    <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%">
                                        <stop stopColor="#BEA1FA" offset="0%" />
                                        <stop stopColor="#FF8C4B" offset="100%" />
                                    </linearGradient>
                                </svg>
                            </div>
                            AI features are now live
                            <span className="ml-0.5 opacity-75 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-[#BEA1FA]/20 px-1.5 py-0.5 rounded-full text-[#BEA1FA]">New</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="max-w-3xl relative" {...fadeInUp}>
                    <div className="mx-auto font-headline text-5xl md:text-6xl text-balance max-w-xl text-center leading-tight font-semibold">
                        Effortlessly publish bllogs in{" "}
                        <span className="relative inline-block highlight">
                            minutes
                        </span>
                    </div>
                    <div className="mt-4 text-center text-base md:text-xl text-balance font-subtitle font-light">
                        Focus on your story, not the setup.
                    </div>
                    <motion.div className="flex justify-center mt-6 gap-4" {...fadeInUpDelayed}>
                        <motion.button
                            onClick={() => navigate('/signup')}
                            className="flex items-center gap-2 bg-[#BEA1FA] border-2 hover:bg-white hover:border-2 border-[#BEA1FA] rounded-full px-5 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#BEA1FA]/30 group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Get started</span>
                            <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 1 }}
                                className="bg-white bg-opacity-30 rounded-full p-0.5"
                            >
                                <ArrowUpRight size={18} />
                            </motion.div>
                        </motion.button>

                        <motion.button
                            onClick={() => navigate('/try-editor')}
                            className="flex items-center gap-2 hover:bg-[#BEA1FA] border-2 bg-white hover:border-2 border-[#BEA1FA] rounded-full px-5 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#BEA1FA]/20 group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Try Editor</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
                <motion.div className="mt-10 mx-auto" {...imageSlideUp}>
                    <a href="https://peerlist.io/traskar/project/bllog">
                        <PeerlistLaunchBadge />
                    </a>
                </motion.div>
                <motion.div {...imageSlideUp}>
                    <img src="/assets/blog.png" className="scale-75 rounded-xl ring-gray-200 ring-2 filter drop-shadow-2xl" alt="Bllog platform interface showcasing the blog page with features such as automatic table of content generation, ai generated summary, relevant tags" />
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
                        <div className="font-headline font-bold text-2xl md:text-3xl text-center mt-4">
                            So Easy, It's Scary
                        </div>
                        <div className="font-subtitle text-base md:text-lg text-center">
                            We're not responsible for sudden fame
                        </div>
                        <motion.div className="grid grid-cols-12 mt-4" variants={staggerChildren} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}>
                            <div className="p-4 col-span-12">
                                <video src="/assets/editor_vid.mp4" controls className="rounded-xl w-full">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-2 md:px-4 col-span-12 gap-4">
                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8 pb-0">
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Markdown editor
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            Markdown for pros, or WYSIWYG for the rest of us!
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/markdown.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110 translate-y-6 w-[90%] object-cover" alt="Markdown editor interface in Bllog" />
                                    </div>
                                </motion.div>
                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8 pb-0">
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Table of Contents
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            Click to jump to a section. Updates automatically
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/toc.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110 translate-y-6 w-[90%] object-cover" alt="Automatic table of content generation for easier navigation" />
                                    </div>
                                </motion.div>
                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#FF8C4B] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8 pb-0">
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Advanced blocks
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            All the fancy blocks you crave, without the headache
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-48 relative">
                                        <img src="/assets/adv_blocks.png" className="ring-1 ring-gray-200 rounded-lg shadow-2xl absolute transform translate-x-11 scale-110 translate-y-6 w-[90%] object-cover" alt="Advanced block options such as images, code blocks, quotes can be used in the Bllog editor" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative">
                    <GradientBlob className="top-[10%]" />
                    <motion.div className="max-w-5xl w-full bg-gray-200/40 border-[1px] border-gray-300 rounded-xl p-2 pb-4 mt-20" {...fadeInUp}>
                        <div className="bg-[#BEA1FA] font-bold rounded-full w-fit py-1 px-2 mt-4 mx-auto">
                            <div className="flex justify-center gap-2">
                                <Sparkles size={16} className="my-auto" />
                                <div className="text-sm font-subtitle">
                                    The Conveniences
                                </div>
                            </div>
                        </div>
                        <div className="font-headline font-bold text-2xl md:text-3xl text-center mt-4">
                            Because Life's Too Short
                        </div>
                        <div className="font-subtitle text-base md:text-lg text-center">
                            For complicated stuff, that is
                        </div>
                        <div className="grid grid-cols-12 mt-4">
                            <div className="p-4 col-span-12">
                                <video src="/assets/convenience_vid.mp4" controls className="rounded-xl w-full">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-2 md:px-4 col-span-12 gap-4">
                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8">
                                        <MousePointer2 className="mb-2" />
                                        <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                            Drag & Drop Images
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            Just drag, drop, and boom! Your images are live.
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8">
                                        <Bookmark className="mb-2" />
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Smart Bookmarks
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            Save your spot, pick up where you left off. Magic!
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-gray-200/40 overflow-clip ring-1 ring-gray-300 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                    <div className="p-4 md:p-8">
                                        <MonitorSmartphone className="mb-2" />
                                        <div className="font-headline font-bold text-xl text-left pb-2">
                                            Sync Everywhere
                                        </div>
                                        <div className="font-subtitle text-base md:text-lg text-gray-800">
                                            Write from anywhere, your words follow you everywhere
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="relative w-full bg-[#0f0f10] py-10 md:py-20 mt-20 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none blur-xl">
                        <div className="absolute top-0 -right-1/4 w-[30%] h-[100%] bg-gradient-to-b from-[#BEA1FA]/30 to-transparent rotate-[45deg] transform origin-top-right"></div>
                        <div className="absolute top-0 right-2/3 w-[30%] h-[100%] bg-gradient-to-b from-[#BEA1FA]/30 to-transparent rotate-[45deg] transform origin-top-right"></div>
                        <div className="absolute top-0 left-1/2 w-[30%] h-[100%] bg-gradient-to-b from-[#FF8C4B]/25 to-transparent rotate-[45deg] transform origin-top-right"></div>
                    </div>
                    <div className="absolute inset-0 opacity-5 md:opacity-10 mix-blend-soft-light">
                        <div className="w-full h-full" style={{ backgroundImage: 'url("/assets/noise.webp")' }}></div>
                    </div>
                    <div className="max-w-5xl mx-auto relative z-10 px-4 text-white">
                        <motion.div className="w-full" {...fadeInUp}>
                            <div className="w-fit mx-auto relative">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF8C4B] to-[#BEA1FA] blur-sm opacity-45"></div>
                                <div className="relative bg-black font-bold rounded-full w-fit py-1 px-2">
                                    <div className="flex justify-center gap-2">
                                        <div className="relative">
                                            <Sparkle size={15} className="-translate-x-0.5 -translate-y-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
                                            <Sparkle size={11} className="absolute -bottom-0.5 -right-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
                                            <svg width="0" height="0">
                                                <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%">
                                                    <stop stopColor="#BEA1FA" offset="0%" />
                                                    <stop stopColor="#FF8C4B" offset="100%" />
                                                </linearGradient>
                                            </svg>
                                        </div>
                                        <div className="text-sm font-subtitle">
                                            The AI Experience
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="font-headline font-bold text-2xl md:text-3xl text-center mt-4">
                                Your Brain, But Faster
                            </div>
                            <div className="font-subtitle text-base md:text-lg text-center">
                                Because even geniuses need a little nudge sometimes
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-4">
                                <div className="p-4 col-span-1 md:col-span-2 lg:col-span-12">
                                    <video src="/assets/ai_vid.mp4" controls className="rounded-xl w-full">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-2 md:px-4 col-span-1 md:col-span-2 lg:col-span-12 gap-4">
                                    <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[rgba(24,24,27,0.75)] overflow-clip border-[1px] border-white/10 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                        <div className="p-4 md:p-8">
                                            <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                                Generate Titles
                                            </div>
                                            <div className="font-subtitle text-base md:text-lg text-white/35">
                                                Writer's block? Let AI generate the perfect headline for your masterpiece.
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[rgba(24,24,27,0.75)] overflow-clip border-[1px] border-white/10 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                        <div className="p-4 md:p-8">
                                            <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                                Fix Grammar
                                            </div>
                                            <div className="font-subtitle text-base md:text-lg text-white/35">
                                                One-click grammar fixes. Because typos are *so* last year.
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[rgba(24,24,27,0.75)] overflow-clip border-[1px] border-white/10 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                        <div className="p-4 md:p-8">
                                            <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                                Change Tone
                                            </div>
                                            <div className="font-subtitle text-base md:text-lg text-white/35">
                                                Sound professional or casual with one click. Perfect for mood swings.
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-span-1 md:col-span-1 lg:col-span-6 bg-[rgba(24,24,27,0.75)] overflow-clip border-[1px] border-white/10 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                        <div className="p-4 md:p-8">
                                            <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                                Summarize Blogs
                                            </div>
                                            <div className="font-subtitle text-base md:text-lg text-white/35">
                                                TL;DR? AI gives you the gist. Save time for cat videos.
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-span-1 md:col-span-1 lg:col-span-6 bg-[rgba(24,24,27,0.75)] overflow-clip border-[1px] border-white/10 rounded-xl h-full hover:ring-2 hover:ring-[#BEA1FA] transition-all" {...cardHoverAnimation}>
                                        <div className="p-4 md:p-8">
                                            <div className="font-headline font-bold text-balance text-xl text-left pb-2">
                                                Expand & Rewrite
                                            </div>
                                            <div className="font-subtitle text-base md:text-lg text-white/35">
                                                Need more fluff? AI expands your thoughts. Word counts: conquered.
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div {...fadeInUp}>
                    <div className="max-w-5xl w-full rounded-xl p-8 mt-28 text-center">
                        <div className="font-headline font-bold text-4xl">
                            So, ready to become a blogging superstar?
                        </div>
                        <div className="font-subtitle text-lg mt-4">
                            It's easier than making coffee (and less messy, probably).
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
    </div >
}