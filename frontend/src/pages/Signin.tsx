import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="overflow-y-hidden">
            <Auth type="signin"/>
        </div>
        <div className="hidden lg:block overflow-y-hidden">
            <Quote />
        </div>
    </div>
}