
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
function Score(props) {
    return (
        <div>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Player Total Score</TableCell>
                            <TableCell align="center">Dealer Total Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">
                                <p>{props.playerScore ? props.playerScore : 0}</p>
                            </TableCell>
                            <TableCell align="center">  <p>{props.dealerScore ? props.dealerScore : 0}</p></TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Score;