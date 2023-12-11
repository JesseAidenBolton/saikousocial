import {useEffect} from 'react'
import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import {useSignOutAccount} from "@/lib/react-query/queriesAndMutations.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {sidebarLinks} from "@/constants";
import {INavLink} from "@/types";

const LeftSidebar = () => {

    const { pathname } = useLocation();

    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess])
    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="logo"
                        width={170}
                        height={136}
                    />
                </Link>

                <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                    <img
                        src={user.imageUrl || 'assets/images/circle-user-round.svg'}
                        alt="profile"
                        className="h-14 w-14 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">
                            {user.name}
                        </p>
                        <p className="small-regular text-emerald-200">
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${
                                isActive && 'bg-green-600'
                            }`}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4" >
                                    <link.imgURL className={`text-green-400 group-hover:invert-white ${
                                        isActive && 'invert-white'
                                    }`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button variant="ghost"
                    className="shad-button_ghost"
                    onClick={() => signOut()}>
                <LogOut />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    )
}
export default LeftSidebar
