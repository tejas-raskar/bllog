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
                <button>
                    <Avatar name={username} size="big" />
                </button>
            </MenuHandler>
            <MenuList placeholder onPointerEnterCapture onPointerLeaveCapture>
                <button onClick={() => navigate(`/profile/${localStorage.getItem("userId")}`)} className="w-full h-max">
                    <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                        <div className="flex">
                            <User />
                            <div className="flex flex-col justify-center ml-2">
                                My Profile
                            </div>
                        </div>
                    </MenuItem>
                </button>
                <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <div className="flex">
                        <Bookmark />
                        <div className="flex flex-col justify-center ml-2">
                            Bookmarks
                        </div>
                    </div>
                </MenuItem>
                <button onClick={ auth.logout } className="w-full h-max">
                    <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                        <div className="flex">
                            <LogOut color="#e57373" />
                            <div className="flex flex-col justify-center ml-2 text-red-300">
                                Log Out
                            </div>
                        </div>
                    </MenuItem>
                </button>
            </MenuList>
        </Menu>
    );
}