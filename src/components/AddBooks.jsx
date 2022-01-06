import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddBooks(){
  const navigate = useNavigate();
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const postData = async () =>{
    const response = await axios.post("http://127.0.0.1:8000/api/add", {
      "bookname": bookName,
      "authorname": authorName
  })
  navigate("/")

    // console.log(bookName);
    // console.log(authorName);
  }
  return(
    <>
      <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "center",}}>
        <TextField fullWidth onChange={(e)=>setBookName(e.target.value)} variant="outlined" label="BookName"/>
      </Container>
      <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "center",}}>
        <TextField fullWidth onChange={(e)=>setAuthorName(e.target.value)} variant="outlined" label="AuthorName"/>
      </Container>
      <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "space-between",}}>
        <Link to={'/'}><Button variant="contained" size="large">Back</Button></Link>
        <Button onClick={postData} color="primary" variant="contained" size="large">Add</Button>
      </Container>
    </>
  )
}