import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"

export const Feed = () => {
    return <div>
        <AppBar />
        <div className="flex justify-center"> 
            <div className="max-w-xl">
                <BlogCard 
                authorname="Tejas Raskar" 
                title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" 
                content="No need to create a fancy and modern website with hundredes of pages to make money online. Making money online is the dream for a man" 
                publishedDate="Dec. 26, 2024"/>
            </div>
        </div>
    </div>
}