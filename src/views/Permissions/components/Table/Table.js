import React, { useState } from 'react';
import {Table, Button, Input, Col, Row } from 'reactstrap';
import { FaDatabase, FaSync, FaPlus } from "react-icons/fa";
import {Field, Formik} from 'formik'
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Yup from 'yup';
import ConfirmModal from "../../../../components/ConfirmModal/ConfirmModal";

const NameValidation = Yup.string()
        .min(4, 'Name too Short!')
        .max(20, 'Name too Long!');

const TableComponent = (props) => {
    const {
        permissions,
        onActionEdit,
        onActionSave,
        onActionDelete,
        onActionAdd,
        onCSVExport,
        onActionRefresh
    } = props;

    const [ modal, setModal ] = useState(false);
    const [ idDelete, setIdDelete ] = useState(null);

    const handleOnEditClick = (rowId) => {
        onActionEdit(rowId);
    }

    const handleOnSaveClick = (row) => {
        NameValidation
            .validate(row.name)
            .then(() => {
                onActionSave(row);
            }).catch(()=>{
                alert("Permission's name must between 4 and 20 characters");
        });
    }

    const handleOnAddClick = () => {
        onActionAdd();
    }

    const handleRefreshOnClick = ()=> {
        onActionRefresh();
    }
    const handleOnDeleteClick = (rowId) => {
        setIdDelete(rowId)
        setModal(true);
    }
    const handleModalCancelOnClick = () => {
        setModal(false);
    }
    const toggle = ()=>{
        setModal(!modal)
    }
    const handleModalOkOnClick = () => {
        setModal(false);
        onActionDelete(idDelete);
    }

    return (
        <>
        <ConfirmModal isOpen={modal} onClickCancel={handleModalCancelOnClick} onClickOk={handleModalOkOnClick} toggle={toggle} title="Confirm delete user" content={`Do you want to delete user #${idDelete}`}/>
            <Row className="table-header">
                <Col lg={6} className="container text-end">
                    <h3 className="vertical-center">PERMISSIONS TABLE</h3>
                </Col>
                <Col lg={5} className="text-end">
                    <Button
                        color="light"
                        title={"ADD NEW"}
                        onClick={handleOnAddClick}
                    >
                        <FaPlus fill="green" />
                    </Button>
                    &nbsp;
                    <Button
                        color="light"
                        title={"EXPORT CSV"}
                        onClick={onCSVExport}
                    >
                        <FaDatabase fill="orange" />
                    </Button>
                    &nbsp;
                    <Button
                        color="light"
                        title="REFRESH"
                        onClick={handleRefreshOnClick}
                    >
                        <FaSync fill="blue" />
                    </Button>
                </Col>
            </Row>
            <Table responsive bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {permissions.map(permission => {
            if(permission)
                return (
                    <>
                        <Formik initialValues={permission} enableReinitialize={true} >{
                            ({ values, handleChange, setFieldValue }) =>{
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{values.id}</th>
                                            <td>
                                                <Field
                                                    as={Input}
                                                    className="my-custom-input"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    readOnly={!values.isEditing}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    {!values.isEditing && <Button onClick={()=>handleOnEditClick(values.id)} outline color="primary">Edit</Button>}
                                                    {values.isEditing && <Button onClick={()=>handleOnSaveClick(values)} outline color="success">Save</Button>}{'   '}
                                                    <Button onClick={()=>handleOnDeleteClick(values.id)} outline color="danger">Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        }
                        </Formik>
                    </>)
            })
            }
            </tbody>
        </Table>
        </>
    );
}
TableComponent.defaultProps = {
    permissions: [{isEditing: true, id: 1, name: ""}],
    handleCSVExport: () => {},

}
TableComponent.propTypes = {
    permissions: PropTypes.array,
    onActionSave: PropTypes.func,
    onActionEdit: PropTypes.func,
    onActionDelete: PropTypes.func,
    onActionAdd: PropTypes.func,
    onCSVExport: PropTypes.func,
}

export default TableComponent;