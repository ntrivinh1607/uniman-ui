import React from "react";
import { RoutesString } from "../../pages/routesString";
import { NavLink} from "reactstrap";
import "./NotFound.css";

export default function NotFound({ status=404, title, content }) {

    return (
        <div id="notfound">
            <div class="notfound">
                <h2>{title || "We are sorry, You don't have permission to access this page!"}</h2>
                <p>{content || "The page you are looking for is only available for authorized people, please sign in or re-sign in for authorization."}</p>
                <NavLink href={`${RoutesString.WELCOME}`}>{"BACK TO HOME"}</NavLink>
            </div>
        </div>
    );
}