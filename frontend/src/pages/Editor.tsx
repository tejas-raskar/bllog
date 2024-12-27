import { AppBar } from "../components/AppBar"
import { Tiptap } from "../components/TipTap"

export const Editor = () => {
    return <div>
        <AppBar /> 
        <div className="flex justify-center"></div>
            <div className="flex justify-center mt-20 max-w-4xl">
                <div className="max-w-4xl">
                    <div>
                        <Tiptap />
                    </div>
                </div>
            </div>
        </div>
}