import React, { Suspense, useState, useEffect } from "react";
import {  BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import Loading from "../components/Loading/Loading";
import AuthenticationService from "../services/Authentication_service";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { RoutesString, PAGES } from './routesString'
import withLayout from '../layouts/withLayout/withLayout'
import AnonymousLayout from "../layouts/AnonymousLayout/AnonymousLayout"

export default function Pages() {
    const [isLogined, setIsLogined] = useState(null);
    const history = useHistory();
    useEffect(() => {
        AuthenticationService.currentUser.subscribe((x) => setIsLogined(x));
    }, []);

    const signout = () => {
        AuthenticationService.signout();
        window.location.href=RoutesString.SIGNIN;
        return null;
    };

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route
                        path={RoutesString.WELCOME}
                        exact={true}
                        component={withLayout({ isLogined })(AnonymousLayout, () => (
                            <>Home page</>
                        ))}
                    />
                    <Route path={RoutesString.SIGNIN}
                           exact={true}
                           component={PAGES.Signin} />
                    <Route
                        path={RoutesString.SIGNUP}
                        exact={true}
                        component={PAGES.Signup} />
                    <PrivateRoute
                        path={RoutesString.ROLES}
                        exact={true}
                        component={withLayout({ isLogined })(AnonymousLayout, () => (
                                <PAGES.Roles/>
                        ))}
                    />
                    <PrivateRoute
                        path={RoutesString.USERS}
                        exact={true}
                        component={withLayout({ isLogined })(AnonymousLayout, () => (
                                <PAGES.Users isLogined={isLogined}/>
                        ))}
                    />
                    <PrivateRoute
                        path={RoutesString.PERMISSIONS}
                        exact={true}
                        component={withLayout({ isLogined })(AnonymousLayout, () => (
                                <PAGES.Permissions/>
                        ))}
                    />
                    <Route
                        path={RoutesString.SIGNOUT}
                        exact={true}
                        component={signout}
                    />
                    <Route path={RoutesString.ACCESS_DENIED} exact={true}>
                            <PAGES.PageNotFound title="ACCESS DENIED" content="The page you are looking for is only available for authorized people, please sign in or re-sign in for authorization." />
                    </Route>
                    <Route key={"page-not-found"} path="*">
                            <PAGES.PageNotFound />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}