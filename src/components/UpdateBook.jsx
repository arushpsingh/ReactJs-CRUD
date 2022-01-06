import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function UpdateBooks(props){
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const updateBookData = useCallback(async()=>{
    if(!bookData) return
    const response = await axios.put(`http://127.0.0.1:8000/api/putupdate`, bookData)
    navigate("/");
  }, []) 

  const fetchBookData = useCallback(async()=>{
    const response = await axios.get(`http://localhost:8000/api/data/${params.id}`)
    setBookData(response.data)
  }, []) 
  
  useEffect(()=>{
    if(!params.id) return
    fetchBookData();
  },[params.id])

  return(
  <>
    <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "center",}}>
      <TextField fullWidth value={bookData?.bookname || ""} onChange={(e)=> setBookData(prev => ({...prev, bookname: e.target.value}))} variant="outlined" label="BookName"/>
    </Container>
    <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "center",}}>
      <TextField fullWidth value={bookData?.authorname || ""} onChange={(e)=> setBookData(prev => ({...prev, authorname: e.target.value}))} variant="outlined" label="AuthorName"/>
    </Container>
    <Container maxWidth="lg" sx={{marginTop:"10px", display: "flex", alignItems: "center", justifyContent: "space-between",}}>
    <Button onClick={() => {navigate("/")}} variant="contained" size="large">Back</Button>
    <Button color="primary" onClick={updateBookData} variant="contained" size="large">Update</Button>
    </Container>
  </>
  )
}