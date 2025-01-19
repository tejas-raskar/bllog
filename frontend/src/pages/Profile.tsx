import { AppBar } from "../components/AppBar"
import { ProfileDetails } from "../components/ProfileDetails"

export const Profile = () => {
    return <div>
        <AppBar type="main" username={localStorage.getItem("username") as string} />
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="grid grid-cols-10 w-full max-w-screen-lg">
                    <div className="col-span-3">
                        <div className="">
                            <ProfileDetails />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}