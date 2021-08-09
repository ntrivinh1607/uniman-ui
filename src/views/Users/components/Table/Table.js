import React, { useState, useEffect } from 'react';
import {Table, Button, Input, Col, Row } from 'reactstrap';
import { FaDatabase, FaSync, FaPlus } from "react-icons/fa";
import {Field, Formik} from 'formik'
import PropTypes, {func} from 'prop-types';
import moment from 'moment';
import * as Yup from 'yup';
import ConfirmModal from "../../../../components/ConfirmModal/ConfirmModal";
import roleApi from "../../../../api/roleApi";

const UsernameValidation = Yup.string()
        .min(2, 'Username too Short!')
        .max(20, 'Username too Long!');

const TableComponent = (props) => {
    const {
        users,
        roles,
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
        UsernameValidation
            .validate(row.username)
            .then(() => {
                onActionSave(row);
            }).catch(()=>{
                alert("Username is must between 2 and 5 characters");
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
                    <h3 className="vertical-center">USERS TABLE</h3>
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
                <th>Username</th>
                <th>Role</th>
                <th>Updated at</th>
                <th>Created at</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => {
            if(user)
                return (
                    <>
                        <Formik initialValues={user} enableReinitialize={true} >{
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
                                                    name="username"
                                                    placeholder="Username"
                                                    readOnly={!values.isEditing}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    as={Input}
                                                    type="select"
                                                    className="my-custom-input"
                                                    name="role"
                                                    onChange={(e) =>{
                                                        handleChange(e);
                                                    }}
                                                    disabled={!values.isEditing}
                                                >
                                                    {roles.map((role, index)=><option value={role.name}>{role.name}</option>)}
                                                </Field>
                                            </td>
                                            <td>{moment(values.updated_date).format("DD-MM-YYYY")}</td>
                                            <td>{moment(values.created_date).format("DD-MM-YYYY")}</td>
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
    users: [{isEditing: true, id: 1, role: "JUNIOR", username: "vinh", updated_at: "", created_at: ""}],
    roles: [{name: "FRESHER"}],
    handleCSVExport: () => {},

}
TableComponent.propTypes = {
    users: PropTypes.array,
    roles: PropTypes.array,
    onActionSave: PropTypes.func,
    onActionEdit: PropTypes.func,
    onActionDelete: PropTypes.func,
    onActionAdd: PropTypes.func,
    onCSVExport: PropTypes.func,
}

export default TableComponent;