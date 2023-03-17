import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import '../App.css';

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
}));

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/user/getAllUser').then((response) => {
          console.log("response")
          setUsers(response.data);
          console.log(users);
        });
      }, []);

      const styleTable ={
        width:900
      }

  return (
    <div className='tableContainer'>
        <h1>All Users</h1>
        <TableContainer component={Paper} style={styleTable} >
      <Table aria-label="customized table" className='userTable'>
        <TableHead>
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell>Firstname</StyledTableCell>
            <StyledTableCell>Lastname</StyledTableCell>
            <StyledTableCell>Password</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.userEmail}>
              <StyledTableCell component="th" scope="row">
                {user.userEmail}
              </StyledTableCell>
              <StyledTableCell>{user.userFirstName}</StyledTableCell>
              <StyledTableCell>{user.userLastName}</StyledTableCell>
              <StyledTableCell>{user.userPassword}</StyledTableCell>
              <StyledTableCell>{user.userRole}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <br/>
    <div>
        <Button href="/admin" variant="contained" color="success">Back</Button>
    </div>
    </div>
  );
}
