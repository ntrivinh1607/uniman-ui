import React, { useState, useEffect } from "react";

import permissionApi from "../../api/permissionApi";
import Table from './components/Table/Table';

export default function Permissions(props) {
    const [ permissions, setPermissions ] = useState([]);

    const fetchData = async () => {
        const data = await permissionApi.getAll();
        if(data) {
            setPermissions(data.map(item=> {
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
                const data = await permissionApi.putById(row.id, {name: row.name});
            } else{
                await permissionApi.post(row);
            }
            await fetchData();
        } catch(err){
            console.log(err)
            return null;
        }
    }
    const onActionEdit = (rowId)=>{
        const newPermissions = JSON.parse(JSON.stringify(permissions));
        setPermissions(newPermissions.map(permission=>{
            if(permission.id === rowId) permission.isEditing = true;
            return permission;
        }));
    }
    const onActionDelete = async (rowId)=>{
        try{
            if(rowId){
                await permissionApi.deleteById(rowId);
                await fetchData();
            } else {
                setPermissions(permissions.map(permission=>{
                    if(permission.id!==rowId) return permission;
                }))
            }
        } catch(err){
            console.log(err)
            return null;
        }
    }
    const onActionAdd = ()=>{
        const newPermissions = [...permissions];
        newPermissions.unshift({id: 0, name: "", isEditing: true});
        setPermissions(newPermissions);
    }

    const onActionRefresh = async ()=>{
        fetchData();
    }
    return (
        <>
            <Table permissions={permissions} onActionRefresh={onActionRefresh} onActionAdd={onActionAdd} onActionDelete={onActionDelete} onActionEdit={onActionEdit} onActionSave={onActionSave}/>
        </>
    );
}
