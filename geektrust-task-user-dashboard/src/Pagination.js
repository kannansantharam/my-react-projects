
function Pagination({ totalUsers, totalUserPerPage, onPageNumberChange, currentPage }) {
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
    const lastPage = totalPages.length - 1
    return (
        <div>
            <div class="pages">
                <button disabled={currentPage === 0 && true} onClick={() => onPageNumberChange(0)}>{"<< "}Start</button>
                <button disabled={currentPage === 0 && true} onClick={() => onPageNumberChange(0, "previousIndex")}> {"< "} Previous </button>
                {
                    totalPages.map((number) => {
                        return <button key={number} className={"page-numbers " + (currentPage === number - 1 ? "active" : '')} onClick={() => onPageNumberChange(number - 1, "pageIndex")}>{number}</button>
                    })
                }
                <button disabled={currentPage === lastPage && true} onClick={() => onPageNumberChange(0, "nextIndex")}>Next {" >"}</button>
                <button disabled={currentPage === lastPage && true} onClick={() => onPageNumberChange(totalPages.length - 1)}>End {" >>"}</button>
            </div>
        </div>
    )
}
export default Pagination;