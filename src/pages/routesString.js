import { lazy } from "react";
// const PageNotFound = lazy(() => import("../views/NotFound/NotFound"));
// const Signin = lazy(() => import("../views/Signin/Signin"));
// const Signup = lazy(() => import("../views/Signup/Signup"));
// const Users = lazy(() => import("../views/Users/Users"));
// const Roles = lazy(() => import("../views/Roles/Roles"));
// const Permissions = lazy(() => import("../views/Permissions/Permissions"));


import PageNotFound from "../views/NotFound/NotFound";
import Signin from "../views/Signin/Signin";
import Signup from "../views/Signup/Signup";
import Users from "../views/Users/Users";
import Roles from "../views/Roles/Roles";
import Permissions from "../views/Permissions/Permissions";

export const PAGES = {
    PageNotFound,
    Signin,
    Signup,
    Users,
    Roles,
    Permissions
};

export const RoutesString = {
    WELCOME: "/",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    ACCESS_DENIED: "/access-denied",
    SIGNOUT: "/auth/signout",
    USERS: "/users",
    ROLES: "/roles",
    PERMISSIONS: "/permissions",
    REFRESHTOKEN: "/auth/refreshtoken",
}