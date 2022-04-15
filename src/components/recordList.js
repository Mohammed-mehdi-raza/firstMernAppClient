import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router' 
import {Link} from 'react-router-dom';

function Record(props){
  const navigate=useNavigate();
  
  async function del(e){
    e.preventDefault(); 
    const response=await fetch("http://localhost:5000/delete",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(props.record),
    }).catch((e)=>{
      console.log(e);
      navigate("/");
      return;
    });  
    console.log(response);
    if(response.ok){
      props.stateChange(1);
      window.location.reload();
    }
    navigate("/"); 
  }
  
  return(
      <tbody>
        <tr>
          <td>{props.record.person_name}</td>
          <td>{props.record.person_position}</td>
          <td>{props.record.person_level}</td>
          <td>
            <Link to={`/edit/${props.record._id}`}>Edit</Link> 
            / 
            <a href="#" onClick={del}>Delete</a>
          </td>
        </tr>
      </tbody>
  )
}

function RecordList(){
  
  const [records,setRecords] = useState([]);
  const [state,setState]=useState(0);
  
  useEffect(()=>{
    async function getrecords(){
      const response=await fetch('http://localhost:5000/record/'); 
      if(!response.ok){
        window.alert('some error occured'); 
        return;
      } 
      const rec=await response.json(); 
      console.log(rec);
      setRecords(rec);
    } 
    getrecords(); 
    return;
  },[records.length]);
  
  function recordList(){
    return records.map((record)=>{
      return(
        <Record record={record} key={record._id} stateChange={setState}/>
      )
    })
  }
  
  return(
    <div>
      <br/>
      <h3>Record List</h3>
      <br/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Level</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
          {recordList()}
      </table>
    </div>
  )
}

export default RecordList;