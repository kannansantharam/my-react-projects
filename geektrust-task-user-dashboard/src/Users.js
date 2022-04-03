function Users({ users }) {
    const onSelectAllInputChange = () => {
        console.log("se")
        let checkBoxes = document.querySelectorAll(".selectUser");
        checkBoxes.forEach((inputBox) => {
            inputBox.click();
        })
    }
    const onInputChange = (event) => {
        console.log(event);
        let parentTr = event.target.parentNode.parentNode;
        if (event.target.checked) {
            parentTr.style.backgroundColor = "#53bab9"
        } else {
            parentTr.style.backgroundColor = "transparent"
        }

    }
    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" className="selectAll" onChange={() => { onSelectAllInputChange() }} /></th>
                    <th>ID </th>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Role </th>
                </tr>
            </thead>
            <tbody>

                {users.map((user) => {
                    return <tr key={user.id}>
                        <td><input type="checkbox" className="selectUser" onChange={(event) => { onInputChange(event) }} /></td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                })}

            </tbody>
        </table>
    )
}
export default Users;