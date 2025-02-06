import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Avatar } from "./BlogCard";
import { User, Bookmark, LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export const ProfileMenu = ({ username }: { username: string }) => {
    const navigate = useNavigate();
    const auth = useAuth();
    return (
        <Menu placement="bottom-start">
            <MenuHandler>
                <button className="bg-black rounded-full text-black">
                    <Avatar name={username} size="big" />
                </button>
            </MenuHandler>
            <MenuList placeholder onPointerEnterCapture onPointerLeaveCapture>
                <MenuItem onClick={() => navigate(`/profile/${localStorage.getItem("userID")}`)} placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <div className="flex">
                        <User />
                        <div className="flex flex-col justify-center ml-2">
                            My Profile
                        </div>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => navigate("/bookmarks")} placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <div className="flex">
                        <Bookmark />
                        <div className="flex flex-col justify-center ml-2">
                            Bookmarks
                        </div>
                    </div>
                </MenuItem>
                <MenuItem onClick={auth.logout} placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <div className="flex">
                        <LogOut color="#e57373" />
                        <div className="flex flex-col justify-center ml-2 text-red-300">
                            Log Out
                        </div>
                    </div>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}