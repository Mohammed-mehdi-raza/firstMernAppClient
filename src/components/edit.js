import React from 'react';
import {useNavigate,useParams} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useState,useEffect} from 'react';

function Edit(){ 
  
  const [user,setUser]=useState({
    name:"",
    position:"",
    level:""
  });
  
  const navigate=useNavigate();
  const params=useParams();
  const id=params.id.toString(); 
 
  useEffect(()=>{
    async function getValue(){ 
      const res=await fetch(`http://localhost:5000/edit/${id}`); 
      const r=await res.json();
      let temp={
        name:"",
        position:"",
        level:""
      } 
      
      temp.name=r.person_name; 
      temp.position=r.person_position; 
      temp.level=r.person_level; 
      
      setUser(temp); 
    } 
  
    getValue(); 
  },[id]);  
  
  const changeHandeler=(e)=>{
    e.preventDefault();
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
    await fetch(`http://localhost:5000/record/${id}`,{
      method:"PUT",
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
  
  var checked3; 
  var checked1;
  var checked2;
  
  if(user.level==="Senior")
    checked3=true;
  else if(user.level==="Intern")
    checked1=true;
  else if(user.level==="Junior")
    checked2=true;
  

  return(
    <div>
      <br/>
      <h3>Edit Record</h3>
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
        <input className="form-check-input" type="radio" name="level" id="inlineRadio1" value="Intern" onChange={changeHandeler} defaultChecked={checked1}/>
        <label className="form-check-label" for="inlineRadio1">Intern</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="level" id="inlineRadio2" value="Junior" onChange={changeHandeler} defaultChecked={checked2}/>
        <label className="form-check-label" for="inlineRadio2">Junior</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="level" id="inlineRadio3" value="Senior" onChange={changeHandeler} defaultChecked={checked3}/>
        <label className="form-check-label" for="inlineRadio3">Senior</label>
      </div><br/> <br/>
      <div className="form-group">
         <input
           type="submit"
           value="edit person"
           className="btn btn-primary"
         />
      </div>
     </form>
    </div>
    );
}

export default Edit;