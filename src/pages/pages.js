import React, { Suspense, useState, useEffect } from "react";
import {  BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import Loading from "../components/Loading/Loading";
import AuthenticationService from "../services/Authentication_service";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { RoutesString, PAGES } from './routesString'
import withLayout from '../layouts/withLayout/withLayout'
import AnonymousLayout from "../layouts/AnonymousLayout/AnonymousLayout";
export default function Pages() {
    const [isLogined, setIsLogined] = useState(null);
    const history = useHistory();
    useEffect(() => {
        AuthenticationService.currentUser.subscribe((x) => setIsLogined(x));
    }, []);

    const signout = () => {
        AuthenticationService.signout();
        if(history)
            history.push("/signin");
        else window.location.href=RoutesString.SIGNIN;
        return null;
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={RoutesString.WELCOME}
                    exact={true}
                    component={withLayout({ isLogined })(AnonymousLayout, () => (
                        <Suspense fallback={<Loading />}>
                            Homeasdasdasd
                        </Suspense>
                    ))}
                />
                <Route path={RoutesString.SIGNIN}
                       exact={true}
                       component={()=>
                            <Suspense fallback={<Loading />}>
                                <PAGES.Signin />
                            </Suspense>
                    } />
                <Route
                    path={RoutesString.SIGNUP}
                    exact={true}
                    component={()=>
                        <Suspense fallback={<Loading />}>
                            <PAGES.Signup />
                        </Suspense>
                    } />
                <PrivateRoute
                    path={RoutesString.ROLES}
                    exact={true}
                    component={withLayout({ isLogined })(AnonymousLayout, () => (
                        <Suspense fallback={<Loading />}>
                            <PAGES.Roles/>
                        </Suspense>
                    ))}
                />
                <PrivateRoute
                    path={RoutesString.USERS}
                    exact={true}
                    component={withLayout({ isLogined })(AnonymousLayout, () => (
                        <Suspense fallback={<Loading />}>
                            <PAGES.Users/>
                        </Suspense>
                    ))}
                />
                <PrivateRoute
                    path={RoutesString.PERMISSIONS}
                    exact={true}
                    component={withLayout({ isLogined })(AnonymousLayout, () => (
                        <Suspense fallback={<Loading />}>
                            <PAGES.Permissions/>
                        </Suspense>
                    ))}
                />
                <PrivateRoute
                    path={RoutesString.SIGNOUT}
                    exact={true}
                    component={signout}
                />
                <Route path={RoutesString.ACCESS_DENIED} exact={true}>
                    <Suspense fallback={<Loading />}>
                        <PAGES.PageNotFound title="" content="" />
                    </Suspense>
                </Route>
                <Route key={"page-not-found"} path="*">
                    <Suspense fallback={<Loading />}>
                        <PAGES.PageNotFound />
                    </Suspense>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}