import React, { useState } from 'react';
import {Table, Button, Input, Col, Row, List } from 'reactstrap';
import { FaDatabase, FaSync, FaPlus } from "react-icons/fa";
import {Field, Formik} from 'formik'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ConfirmModal from "../../../../components/ConfirmModal/ConfirmModal";
import MultiSelectComponent from "../MultiSelectComponent/MultiSelectComponent";
const NameValidation = Yup.string()
        .min(2, 'Name too Short!')
        .max(10, 'Name too Long!');

const TableComponent = (props) => {
    const {
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

    const handleOnEditClick = (rowId, row) => {
        console.log(row)
        onActionEdit(rowId);
    }

    const handleOnSaveClick = (row) => {
        NameValidation
            .validate(row.name)
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
                    <h3 className="vertical-center">ROLES TABLE</h3>
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
            <Table responsive bordered style={{minHeight: "650px"}}>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Permissions</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {roles.map(role => {
            if(role)
                return (
                    <>
                        <Formik initialValues={role} enableReinitialize={true} >{
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
                                                {values.isEditing &&
                                                <MultiSelectComponent selectedValues={values.permissions} setFieldValue={setFieldValue}/>}
                                                {!values.isEditing &&
                                                <List>
                                                    {values.permissions.map((permission, index)=><li key={`li${index}`}>{`${permission.id}:  ${permission.name}`}</li>)}
                                                </List>}
                                            </td>
                                            <td>
                                                <div>
                                                    {!values.isEditing && <Button onClick={()=>handleOnEditClick(values.id, values)} outline color="primary">Edit</Button>}
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
    roles: [{isEditing: true, id: 1, name: "", permissions:[]}],
    handleCSVExport: () => {},

}
TableComponent.propTypes = {
    roles: PropTypes.array,
    onActionSave: PropTypes.func,
    onActionEdit: PropTypes.func,
    onActionDelete: PropTypes.func,
    onActionAdd: PropTypes.func,
    onCSVExport: PropTypes.func,
}

export default TableComponent;