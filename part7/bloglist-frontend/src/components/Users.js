import { Link } from "react-router-dom";
import { Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material'

const Users = ({ users }) => {
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableBody>
            <h2>users</h2>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell><strong>blogs created</strong></TableCell>
                </TableRow>
            </TableHead>            
                <TableBody>
                    {users.map(user => 
                        <TableRow key={user.id}>
                            <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default Users