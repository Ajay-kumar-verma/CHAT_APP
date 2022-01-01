import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
const Join=()=>{

const [nme,setName]=useState("");
const [room,setRoom]=useState("");

return(<>
    <h1>joinning Pages ! {nme} {room} </h1>
  
<input type='text' placeholder="Enter Your  Name" value={nme}
onChange={(e)=>{setName(e.target.value)}}   required/> <br/>
<input type='text' placeholder="Enter Room id"  value={room}  
onChange={(e)=>{setRoom(e.target.value)}}    required/><br/>

<Link   onClick={e=>!(nme && room)?e.preventDefault():null} to={`/chat?name=${nme}&room=${room}`} >
<button type="submit" > Sign In  </button>
</Link>

</>)

}

export default Join;