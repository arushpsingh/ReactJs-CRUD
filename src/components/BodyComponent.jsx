import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { ReactComponent as EditIcon} from '../assets/icons/Edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/Delete.svg';


export default function BodyComponent(){
  const [list, setList] = useState([])

  
  const deleteBookData = useCallback(async(id)=>{
    if(!id) return
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`)
    fetchBookData();
  }, []) 

  const fetchBookData = useCallback(async()=>{
    const response = await axios.get(`http://localhost:8000/api/data/`)
    setList(response.data);
  }, []) 
  
  useEffect(()=>{
    fetchBookData();
  },[])

  return(
    <>
      {/* {list && list.map(data=><div>{data.bookname}</div>)} */}
      <Container maxWidth="lg">
        <h1>Book Management System</h1>
        <div className="container">
        <h2>Book Data</h2>
          <Link to={'add'}><Button variant="contained" size="large">Add Books</Button></Link>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><h3>Book Name</h3></TableCell>
                <TableCell align="center"><h3>Author Name</h3></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((data) => (
                <TableRow
                  key={data.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {data.bookname}
                  </TableCell>
                  <TableCell align="center">{data.authorname}</TableCell>
                  <TableCell>
                    <Link to={{pathname:`/putupdate/${data.id}`}}><IconButton>
                      <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => deleteBookData(data.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}