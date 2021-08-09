import React, { useState, useEffect } from "react";

import roleApi from "../../api/roleApi";
import Table from './components/Table/Table';

export default function Roles(props) {
    const [ roles, setRoles ] = useState([]);

    const fetchData = async () => {
        const data = await roleApi.getAll();
        if(data) {
            setRoles(data.map(item=> {
                item.isEditing = false;
                return item;
            }));
        }
    }

    useEffect(()=>{
        fetchData();
    }, [])

    const onActionSave = async (row)=>{
        try{
            if(row.id) {
                if(row.permissions?.length>=1){
                    const data = await roleApi.putById(row.id, {name: row.name, permissions: row.permissions.map(permission => permission.id)});
                }else{
                    const data = await roleApi.putById(row.id, {name: row.name});
                }
            } else{
                if(row.permissions?.length>=1){
                    const data = await roleApi.post({name: row.name, permissions: row.permissions.map(permission => permission.id)});
                }else{
                    const data = await roleApi.post(row.id, {name: row.name});
                }
            }
            await fetchData();
        } catch(err){
            console.log(err)
            return null;
        }
    }
    const onActionEdit = (rowId)=>{
        const newRoles = JSON.parse(JSON.stringify(roles));
        setRoles(newRoles.map(role=>{
            if(role.id === rowId) role.isEditing = true;
            return role;
        }));
    }
    const onActionDelete = async (rowId)=>{
        try{
            if(rowId){
                await roleApi.deleteById(rowId);
            }
            await fetchData();
        } catch(err){
            console.log(err)
            return null;
        }
    }
    const onActionAdd = ()=>{
        const newRoles = [...roles];
        newRoles.unshift({id: 0, name: "", isEditing: true, permissions: []});
        setRoles(newRoles);
    }

    const onActionRefresh = async ()=>{
        fetchData();
    }
    return (
        <Table roles={roles} onActionRefresh={onActionRefresh} onActionAdd={onActionAdd} onActionDelete={onActionDelete} onActionEdit={onActionEdit} onActionSave={onActionSave}/>
    );
}