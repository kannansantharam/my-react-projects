import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
function Users({ users }) {
    const [userProp, setUserProp] = useState([...users]);
    console.log(userProp)
    useEffect(() => {
        setUserProp([...users])
    }, [users])
    const onSelectAllInputChange = (event) => {
        if (event.target.checked) {
            userProp.map((user) => {
                user["isChecked"] = true;
            });
            setUserProp([...userProp])
        } else {
            userProp.map((user) => {
                user["isChecked"] = false;
            });
            setUserProp([...userProp])
        }
    }
    const onInputChange = (event, userId) => {
        if (event.target.checked) {
            // parentTr.style.backgroundColor = "#ddd";
            userProp.find(u => u.id === userId).isChecked = true;
            setUserProp([...userProp])
        } else {
            // parentTr.style.backgroundColor = "transparent";
            userProp.find(u => u.id === userId).isChecked = false;
            setUserProp([...userProp])
        }

    }
    const removeUser = (userId) => {
        setUserProp(prev => [...prev, userProp.find(u => u.id === userId).isRemoved = true])
    }
    const editUser = (userId) => {
        setUserProp(prev => [...prev, userProp.find(u => u.id === userId).allowEdit = true])
    }
    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" className="selectAll" onChange={(event) => { onSelectAllInputChange(event) }} /></th>
                    <th>ID </th>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Role </th>
                    <th>Action </th>
                </tr>
            </thead>
            <tbody>

                {userProp.map((user) => {
                    if (user.isRemoved) {
                        return
                    }
                    return <tr contentEditable={user.allowEdit && true} key={user.id} style={user.isChecked ? { "backgroundColor": "#ddd" } : { "backgroundColor": "transparent" }}>
                        <td>
                            <input type="checkbox"
                                checked={user.isChecked ? "checked" : false}
                                name="checkbox" className="selectUser"
                                onChange={(event) => { onInputChange(event, user.id) }}
                            />
                        </td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <span className="actionButtons" onClick={() => editUser(user.id)} ><FaEdit /></span>
                            <span className="actionButtons" onClick={() => removeUser(user.id)} ><FaTrash /></span>
                        </td>
                    </tr>
                })}

            </tbody>
        </table>
    )
}
export default Users;