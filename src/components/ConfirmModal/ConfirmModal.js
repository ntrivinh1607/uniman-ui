import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, toggle, title, content, className, onClickCancel, onClickOk}) => {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader >{title}</ModalHeader>
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onClickOk}>OK</Button>{' '}
                    <Button color="secondary" onClick={onClickCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
ConfirmModal.defaultProps = {
    isOpen: false,
    title: "",
    content: "",
    className: "",
    onClickCancel: ()=>{},
    onClickOk:  ()=>{},
    toggle:  ()=>{},
}
ConfirmModal.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
    onClickCancel: PropTypes.func,
    onClickOk: PropTypes.func,
    toggle: PropTypes.func,
}
export default ConfirmModal;

