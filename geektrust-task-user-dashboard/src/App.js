
import './App.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import Users from './Users'
function App() {
  const [users, setUsers] = useState([]);
  const [userPerPage, setUserPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [totalUserForPerPage, setTotalUserForPerPage] = useState(10);

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData)
        setUsers(userData);
        // setUserPerPage(userData.splice(0, totalUserForPerPage));
      });
  }, []);
  const onPageChange = (number) => {
    console.log("page ", number);
    setCurrentPage(number);
  }
  useEffect(() => {
    let currentUserNumber = currentPage * userPerPage.length; //3*10
    console.log(currentUserNumber)
    setUserPerPage(currentUserNumber);
  }, [currentPage])
  return (
    <div>
      <Header />
      <Users users={users.splice(userPerPage, totalUserForPerPage)} />
      <Pagination
        totalUsers={users.length}
        totalUserPerPage={users.splice(userPerPage, totalUserForPerPage).length}
        onPageNumberChange={onPageChange}
      />
    </div>
  );
}

export default App;
