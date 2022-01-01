import React ,{useState,useEffect} from 'react';
import queryString from 'query-string'
import io  from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom'
let socket;

const Chat=()=>{
let [msg,setmsg]=useState("");
let [name,setName]=useState("");
let [room,setRoom]=useState("");
const ENDPOINT='localhost:2000';
let [msgList,setmsgList]=useState([]);

useEffect(()=>{
//  console.log(window.location.search)   
 const {name,room}=queryString.parse(window.location.search); 
// console.log(name,room);
 setName(name); setRoom(room);
 socket= io(ENDPOINT);
 console.log(socket.id);
 
 socket.emit('join',{room,name})
   console.log("You joinned the chat !..");
 

// socket.emit("join",{name,room},data=>{console.log(data);});
  
   socket.on('WlCm',(data)=>{
    setmsgList([...msgList,data]);
    console.log("welcome msg recieved ...!");
   })

   
},[ENDPOINT,window.location.search])   



useEffect(() => {
  socket.on("bdCtMg",data=>{
 
     console.log("bdCtMg msg called ...!") 
   if(data.room!=room){return;}
   let {name,text}=data;
  setmsgList([...msgList,name+":~"+text]);
  //  console.log("bdcst msg recieved !");
 
  
   

   });

 },[msgList])

 









const  send=(text)=>
{  
 socket.emit('msg',{room,name,text});
 setmsgList([...msgList,"You:~"+text]);  
 console.log("Send event fire !");
return;
}





// document.querySelector('body').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {

//    if(msg!==""){
//    send(msg);
//    }else{
//        console.log("Empty message cant send... !");
//    }
       
// }
// });



return(<>
<div  style={{display:'flex',height:"300px", overflowY:"auto", flexDirection:"column",margin:"auto" 
,padding:"10px",width:"fit-content",border:'2px solid red'}}  >
    <div style={{height:"100%"}}>
   
    {msgList.map(e=><div>{e}</div>)}
  </div>


<div style={{height:'10%'}} >
<input style={{flex:'4'}} type="text"  placeholder="Enter text" value={msg}  
 autoFocus="true"
 onChange={(e)=>{setmsg(e.target.value)}}
 />

<input style={{flex:'1'}}  type="submit"  value={"Send"}
onClick={e=>msg?(send(msg),setmsg("")):
(e.preventDefault,console.log("Empty message cant send...!"))} />
</div>
</div>
</>)
}

export default Chat;