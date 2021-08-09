import React from "react";
import { Row, Col } from "reactstrap";
import Menu from "../../components/Menu/Menu";

import "./AnonymousLayout.css";

const AnonymousLayout = ({ isLogined, children }) => {
    return (
        <div className="AnonymousLayout__wrapper">
            <div className="AnonymousLayout__top">
                <div>
                    <Menu isLogined={isLogined} />
                </div>
            </div>
            <Row className="AnonymousLayout__middle">
                <Col>{children}</Col>
            </Row>
        </div>
    );
};

export default AnonymousLayout;