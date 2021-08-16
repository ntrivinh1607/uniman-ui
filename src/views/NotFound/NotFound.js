import React from "react";
import { RoutesString } from "../../pages/routesString";
import { NavLink} from "reactstrap";
import "./NotFound.css";

export default function NotFound({ status=404, title="NOT FOUND", content="The page you looking for is not found, please type link address correctly" }) {

    return (
        <div id="notfound">
            <div class="notfound">
                <h2>{title}</h2>
                <p>{content}</p>
                {title==="NOT FOUND" && <NavLink href={`${RoutesString.WELCOME}`}>{"BACK TO HOME"}</NavLink>}
                {title==="ACCESS DENIED"&& <NavLink href={`${RoutesString.SIGNIN}`}>{"BACK TO SIGN IN PAGE"}</NavLink>}
            </div>
        </div>
    );
}