
function Pagination({ totalUsers, totalUserPerPage, onPageNumberChange }) {

    const totalPageNumbers = Math.ceil(totalUsers / totalUserPerPage);
    const totalPages = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
        totalPages.push(i)
    }
    console.log(totalUsers, totalUserPerPage)
    return (
        <div>
            <ul>
                <li>Previous</li>
                {
                    totalPages.map((number) => {
                        return <li key={number} onClick={() => onPageNumberChange(number + 1)}>{number}</li>
                    })
                }
                <li>Next</li>
            </ul>
        </div>
    )
}
export default Pagination;