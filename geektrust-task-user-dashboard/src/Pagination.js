
function Pagination({ totalUsers, totalUserPerPage, onPageNumberChange }) {
    if (!totalUsers) {
        return (
            <></>
        )
    }
    const totalPageNumbers = Math.ceil(totalUsers / totalUserPerPage);
    const totalPages = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
        totalPages.push(i)
    }
    console.log(totalUsers, totalUserPerPage)
    return (
        <div>
            <ul>
                <li onClick={() => onPageNumberChange(0, "previousIndex")}> Previous </li>
                {
                    totalPages.map((number) => {
                        return <li key={number} onClick={() => onPageNumberChange(number - 1, "pageIndex")}>{number}</li>
                    })
                }
                <li onClick={() => onPageNumberChange(0, "nextIndex")}>Next</li>
            </ul>
        </div>
    )
}
export default Pagination;