import React, {useEffect, useState} from 'react';
import {Multiselect} from "multiselect-react-dropdown";
import permissionApi from "../../../../api/permissionApi";

const MultiSelectComponent = ({ selectedValues = [], setFieldValue=()=>{}}) => {
    const [ permissions, setPermissions ] = useState([{id: 0, name: "READ"}]);

    const fetchData = async()=>{
        const data = await permissionApi.getAll()
        if(data) {
            setPermissions(data);
        }
    }
    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <Multiselect
            displayValue="name"
            isObject={true}
            onRemove={(selectedList, removedItem) => {
                setFieldValue("permissions", selectedList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
            }}
            onSelect={(selectedList, selectedItem)=>{
                setFieldValue("permissions", selectedList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
            }}
            options={permissions}
            selectedValues={selectedValues}
        />
    )
}

export default MultiSelectComponent;