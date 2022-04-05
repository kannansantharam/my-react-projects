import { FaEdit, FaTrash } from "react-icons/fa";
function Users({ users }) {
    const onSelectAllInputChange = (event) => {
        let checkBoxes = document.querySelectorAll(".selectUser");
        checkBoxes.forEach((inputBox) => {
            if (event.target.checked) {
                inputBox.checked = true;
                inputBox.parentNode.parentNode.style.backgroundColor = "#53bab9"
            } else {
                inputBox.checked = false
                inputBox.parentNode.parentNode.style.backgroundColor = "transparent"
            }
        })
    }
    const onInputChange = (event) => {
        let parentTr = event.target.parentNode.parentNode;
        if (event.target.checked) {
            parentTr.style.backgroundColor = "#ddd"
        } else {
            parentTr.style.backgroundColor = "transparent"
        }

    }
    const removeUser = (event) => {
        let parentTr = event.currentTarget.parentNode.parentNode;
        parentTr.remove()
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

                {users.map((user) => {
                    return <tr key={user.id}>
                        <td><input type="checkbox" name="checkbox" className="selectUser" onChange={(event) => { onInputChange(event) }} /></td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <span className="actionButtons" onClick={(event) => editUser(event)} ><FaEdit /></span>
                            <span className="actionButtons" onClick={(event) => removeUser(event)} ><FaTrash /></span>
                        </td>
                    </tr>
                })}

            </tbody>
        </table>
    )
}
export default Users;