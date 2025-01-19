import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Avatar } from "./BlogCard";
import { User, Bookmark, LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom";
export const ProfileMenu = ({ username }: { username: string }) => {
    const navigate = useNavigate();
    return (
        <Menu placement="bottom-start">
            <MenuHandler>
                <button>
                    <Avatar name={username} size="big" />
                </button>
            </MenuHandler>
            <MenuList placeholder onPointerEnterCapture onPointerLeaveCapture>
                <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <button onClick={() => navigate('/profile')}>
                        <div className="flex">
                            <User />
                            <div className="flex flex-col justify-center ml-2">
                                My Profile
                            </div>
                        </div>
                    </button>
                </MenuItem>
                <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <div className="flex">
                        <Bookmark />
                        <div className="flex flex-col justify-center ml-2">
                            Bookmarks
                        </div>
                    </div>
                </MenuItem>
                <MenuItem placeholder onPointerEnterCapture onPointerLeaveCapture>
                    <button onClick={() => {localStorage.clear(); navigate('/signin')}}>
                        <div className="flex">
                            <LogOut color="#e57373" />
                            <div className="flex flex-col justify-center ml-2 text-red-300">
                                Log Out
                            </div>
                        </div>
                    </button>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}