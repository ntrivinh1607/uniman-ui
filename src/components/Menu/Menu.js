import React, { useState } from "react";
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from "reactstrap";
import {
    FaKey,
    FaLanguage,
    FaSearch,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";

import "./Menu.css";

import defaultAvatar from "../../logo.svg";

import { RoutesString } from "../../pages/routesString";
import { useHistory } from "react-router";

export default function Menu(props) {
    const history = useHistory();
    const { isLogined } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);

    const toggle = function () {
        setDropdownOpen((prevState) => !prevState);
    };

    const toggle1 = function () {
        setDropdownOpen1((prevState) => !prevState);
    };
    const srcImgAvt = isLogined?.avatar
        ? `${isLogined?.avatar}`
        : defaultAvatar;

    return (
        <Navbar expand="lg" className="navbar__container">
            <Nav navbar>
                <NavItem className="navbar__btn_home">
                    <NavLink
                        className="nav-link btn_home active"
                        onClick={() => history.push(RoutesString.WELCOME)}
                    >
                        HOME
                    </NavLink>
                </NavItem>
                {isLogined ?
                    <>
                    <NavItem>
                        <NavLink onClick={() =>
                            history.push(
                                RoutesString.USERS
                            )}>
                            USER LIST
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() =>
                            history.push(
                                RoutesString.ROLES
                            )
                        } >
                            ROLE LIST
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() =>
                            history.push(
                                RoutesString.PERMISSIONS
                            )
                        } >
                            PERMISSION LIST
                        </NavLink>
                    </NavItem>
                    </> : <></>
                }

            </Nav>
            <Nav className="mx-5" navbar>
                {!isLogined ? (
                    <NavItem>
                        <Button
                            className="login-btn"
                            outline
                            onClick={() =>
                            history.push(
                                RoutesString.SIGNIN
                            )}
                        >
                            <FaSignInAlt /> &nbsp; Sign In
                        </Button>
                    </NavItem>
                ) : (
                    <NavItem>
                        <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            className="profile_dropdown"
                        >
                            <DropdownToggle
                                caret
                                className="options-btn profile_dropdown__toggle"
                            >
                                <img
                                    style={{ borderRadius: "50%" }}
                                    src={srcImgAvt}
                                    alt="avartar"
                                    className="avt_profile"
                                />{" "}
                                &nbsp;
                                {`${isLogined.username}`}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink
                                        className="btn_dropdown"
                                        onClick={() =>
                                            history.push(RoutesString.USERS)
                                        }
                                    >
                                        <FaUserCircle /> User List
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink
                                        className="btn_dropdown"
                                        onClick={() =>
                                            history.push(
                                                RoutesString.ROLES
                                            )
                                        }
                                    >
                                        <FaKey /> Role List
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink
                                        className="btn_dropdown"
                                        onClick={() =>
                                            history.push(
                                                RoutesString.PERMISSIONS
                                            )
                                        }
                                    >
                                        <FaKey /> Permission List
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink
                                        className="btn_dropdown"
                                        onClick={() =>
                                            history.push(
                                                RoutesString.SIGNOUT
                                            )}
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                )}
                &emsp;
                <NavItem>
                    <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                        <DropdownToggle
                            caret
                            outline
                            className="language-btn profile_dropdown__toggle"
                        >
                            <FaLanguage /> &nbsp; LANGUAGE
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink>
                                    {FaSearch}&nbsp; ENGLISH
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink >
                                    {FaKey}&nbsp; VIETNAMESE
                                </NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </Nav>
        </Navbar>
    );
}