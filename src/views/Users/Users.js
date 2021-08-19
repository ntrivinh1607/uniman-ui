import React, { useState, useEffect } from "react";

import userApi from "../../api/userApi";
import Table from './components/Table/Table';
import {DEFAULT_PASSWORD} from "../../constants/constants";
import roleApi from "../../api/roleApi";

export default function Users(props) {
    const [ users, setUsers ] = useState([]);
    const [ roles, setRoles ] = useState([])
    const curUser = props.isLogined;
    const fetchRoles = async () => {
        try{
            const data = await roleApi.getAll();
            setRoles(data?.map(item=> ({id: item.id, name: item.name})));
        }catch(e){
            alert('Cannot fetch roles!');
        }
    }

    const fetchUsers = async () => {
        try{
            const data = await userApi.getAll();
            if(data) {
                setUsers(data
                    .map(item => {
                    item.isEditing = false;
                    return item;
                }));
            }
        } catch(err){
            alert("404 Error: Cannot fetch users");
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
                await userApi.post(row);
            }
            await fetchUsers();
        } catch(err){
            if(err.response.status === 409)
            {
                alert("409 Error: Duplicate username");
            } else {
                alert("400 Error: Cannot save user, please enter correctly");
            }
        }
    }
    const onActionEdit = (rowId)=>{
        if(rowId === curUser.id){
            alert("Please edit your information in Profile page");
        } else {
            const newUsers = JSON.parse(JSON.stringify(users));
            setUsers(newUsers.map(user=>{
                if(user.id === rowId) user.isEditing = true;
                return user;
            }));
        }
    }
    const onActionDelete = async (rowId)=>{
        try{
            if(rowId){
                if(rowId === curUser.id){
                    alert("Cannot delete yourself!!!");
                } else {
                    await userApi.deleteById(rowId);
                }
            }
            await fetchUsers();
        } catch(err){
            alert('Cannot delete User!');
        }
    }
    const onActionAdd = ()=>{
        const newUsers = [...users];
        newUsers.unshift({id: 0, username: "", role: "", updated_at: Date.now(), created_at: Date.now(), isEditing: true});
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
