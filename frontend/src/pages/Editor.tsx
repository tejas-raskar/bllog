import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"

export const Editor = () => {
    return <div>
        <AppBar type="editor" /> 
        <div className="flex justify-center">
            <div className="flex justify-center mt-15 max-w-4xl">
                <Tiptap />
            </div>
        </div>
    </div>
}