import React from 'react';
import {useNavigate} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useState} from 'react';

function Create(){
  
  const [user,setUser]=useState({
    name:"",
    position:"",
    level:""
  });
  
  const navigate=useNavigate();
  
  const changeHandeler=(e)=>{
    let s=e.target.name;
    let temp={
      name:"",
      position:"",
      level:""
    }
    if(s==="name"){
      temp.name=e.target.value;
      temp.position=user.position;
      temp.level=user.level;
    }
    else if(s==="position"){
      temp.position=e.target.value;
      temp.name=user.name;
      temp.level=user.level;
    }
    else if(s==="level"){
      temp.level=e.target.value;
      temp.name=user.name;
      temp.position=user.position;
    }
    setUser(temp);
  }
  
  async function submit(e){
    e.preventDefault();
    await fetch("http://localhost:5000/record/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user),
    }).catch((e)=>{
      console.log(e);
      navigate("/");
      return;
    });
    setUser({name:"",position:"",level:"",});
    navigate("/");
  }
  
  return(
    <div>
      <br/>
      <h3>Create Record</h3>
      <br/>
     <form onSubmit={submit} >
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Name of the person" aria-label="Username" name="name" value={user.name} onChange={changeHandeler} required />
      </div>
      <br/>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Person's position" aria-label="Username" name="position" value={user.position} onChange={changeHandeler} required />
      </div>
      <br/>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="level" id="inlineRadio1" value="Intern" onChange={changeHandeler} required/>
        <label className="form-check-label" htmlFor="inlineRadio1">Intern</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="level" id="inlineRadio2" value="Junior" onChange={changeHandeler} required/>
        <label className="form-check-label" htmlFor="inlineRadio2">Junior</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="level" id="inlineRadio3" value="Senior" onChange={changeHandeler} required/>
        <label className="form-check-label" htmlFor="inlineRadio3">Senior</label>
      </div><br/> <br/>
      <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
      </div>
     </form>
    </div>
    );
}

export default Create;