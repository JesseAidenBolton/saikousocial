import {BookImage, Bookmark, Home, ImagePlus, UsersRound} from "lucide-react";

export const sidebarLinks = [
    {
        imgURL: Home,
        route: "/",
        label: "Home",
    },
    {
        imgURL: BookImage,
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: UsersRound,
        route: "/all-users",
        label: "People",
    },
    {
        imgURL: Bookmark,
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: ImagePlus,
        route: "/create-post",
        label: "Create Post",
    },
];

export const bottombarLinks = [
    {
        imgURL: Home,
        route: "/",
        label: "Home",
    },
    {
        imgURL: BookImage,
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: Bookmark,
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: ImagePlus,
        route: "/create-post",
        label: "Create",
    },
];
