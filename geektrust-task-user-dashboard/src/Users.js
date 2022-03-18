function Users({ users }) {
    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" className="selectAll" /></th>
                    <th>ID </th>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Role </th>
                </tr>
            </thead>
            <tbody>

                {users.map((user) => {
                    return <tr key={user.id}>
                        <td><input type="checkbox" className="selectUser" /></td>
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