import React, { useState, useEffect } from "react";

import userApi from "../../api/userApi";
import Table from './components/Table/Table';
import {DEFAULT_PASSWORD} from "../../constants/constants";
import roleApi from "../../api/roleApi";

export default function Users(props) {
    const [ users, setUsers ] = useState([]);
    const [ roles, setRoles ] = useState([{id: 0, name: "FRESHER"}])

    const fetchRoles = async () => {
        try{
            const data = await roleApi.getAll();
            setRoles(data?.map(item=> ({id: item.id, name: item.name})));
        }catch(e){
            console.log(e);
        }
    }

    const fetchUsers = async () => {
        try{
            const data = await userApi.getAll();
            if(data) {
                setUsers(data.map(item=> {
                    item.isEditing = false;
                    return item;
                }));
            }
        }catch(e){
            console.log(e);
        }
    }
    const fetchData = async () => {
        await fetchUsers();
        await fetchRoles();
    }
    useEffect(()=>{
        fetchData();
    }, [])

    const onActionSave = async (row)=>{
        try{
            if(row.id) {
                const data = await userApi.putById(row.id, {username: row.username, role: row.role});
            } else{
                row.password = DEFAULT_PASSWORD;
                await userApi.signup(row);
            }
            await fetchUsers();
        } catch(err){
            alert(`Save error! ${err}`)
            return null;
        }
    }
    const onActionEdit = (rowId)=>{
        const newUsers = JSON.parse(JSON.stringify(users));
        setUsers(newUsers.map(user=>{
            if(user.id === rowId) user.isEditing = true;
            return user;
        }));
    }
    const onActionDelete = async (rowId)=>{
        try{
            if(rowId){
                await userApi.deleteById(rowId);
            }
            await fetchUsers();
        } catch(err){
            alert(`Delete Error! ${err}`)
            return null;
        }
    }
    const onActionAdd = ()=>{
        const newUsers = [...users];
        newUsers.unshift({id: 0, username: "", role: "FRESHER", updated_at: Date.now(), created_at: Date.now(), isEditing: true});
        setUsers(newUsers);
    }

    const onActionRefresh = async ()=>{
        fetchUsers();
    }
    return (
        <Table users={users}
               roles={roles}
               onActionRefresh={onActionRefresh}
               onActionAdd={onActionAdd}
               onActionDelete={onActionDelete}
               onActionEdit={onActionEdit}
               onActionSave={onActionSave}
        />
    );
}
