
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
        console.log(userData);
        setUsers(userData);
        // setUserPerPage(userData.splice(0, totalUserForPerPage));
      });
  }, []);
  const onPageChange = (number, origin) => {
    if (origin === "previousIndex") {
      number = currentPage - 1;
    } else if ((origin === "nextIndex")) {
      number = currentPage + 1
    }
    let currentUserNumber = number * totalUserForPerPage; //3*10
    setUserPerPage(currentUserNumber)
    setCurrentPage(number);
  }
  // useEffect(() => {
  //   let currentUserNumber = currentPage * userPerPage === 0 ? 10 : userPerPage; //3*10
  //   console.log(currentUserNumber)
  //   // setUserPerPage(currentUserNumber);
  // }, [currentPage])
  return (
    <div className="main-container">
      <header>
        <Header />
      </header>
      <section className="user-list">
        <Users users={users.slice(userPerPage, userPerPage + totalUserForPerPage)} />
      </section>
      <section className="pagination-section">
        <Pagination
          totalUsers={users.length}
          totalUserPerPage={totalUserForPerPage}
          onPageNumberChange={onPageChange}
        />
      </section>
      <div className="user-per-page">
        Users per page
        <select onChange={(e) => { setTotalUserForPerPage(e.target.value) }}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>

        </select>
      </div>
    </div>
  );
}

export default App;
