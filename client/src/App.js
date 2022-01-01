import React from 'react';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import Join from './component/Join';
import Chat from './component/Chat';

const App=()=>{
    return(
    <>
     <h1> This is chat App </h1>  
  <Router>
  <Route path='/' exact  component={Join} />  
  <Route path='/chat'  component={Chat} />  
  </Router>
    </>
   
      )

}

export default App;