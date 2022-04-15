import React from 'react';
import Navbar from './components/navbar.js';
import RecordList from './components/recordList.js';
import Create from './components/create.js'; 
import Edit from './components/edit.js';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<RecordList/>}/>
      <Route exact path="/create" element={<Create/>}/> 
      <Route path="/edit/:id" element={<Edit/>}/>
     </Routes>
    </div>
  );
}

export default App;
