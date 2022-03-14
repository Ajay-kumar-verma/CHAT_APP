import {Box,Stack,VStack,HStack,Input,Center,Button,Spacer,Text} from '@chakra-ui/react'
import {useState} from 'react';
import io  from "socket.io-client";
const ENDPOINT='localhost:2000';
const  socket= io(ENDPOINT)

function App() {
const [msg,setmsg]=useState([{mine:false,val:"Ajay"},{mine:true,val:"Vikahs"}]);
const [val,setval]=useState("");
const text=(e)=>{
   console.log(e.target.value)
   setval(e.target.value);
  }

const Send=()=>{
  if(val==="") return;
 setmsg([...msg,{mine:true,val:val}]); 
 socket.emit("msg",val);
 console.log(val," msg sent ");
 setval("");  
 } 
 
 socket.on("receive",val=>{
  if(val==="") return;
  setmsg([...msg,{mine:false,val:val}]); 
 })

 return (
  <>
  <VStack w="100%" h="100vh" bg="#D3D3D3">
  <Center w="90%" h="10vh" bg="white" color="blue" fontSize={40} p={5} > Secure Chat web Site </Center>
  <Box contenO w="90%" h="80vh" bg="white" color="green" fontSize={20} p={5} > 
     
     {msg.map(e=>{
        
      return  e.mine?(
       <HStack>
         <Box maxW="50%" ></Box>
             <Spacer/>
         <Box maxW="50%" >{e.val}</Box>
         </HStack>

     ):(
      <HStack>
      <Box maxW="50%"  >{e.val}</Box>
          <Spacer/>
      <Box maxW="50%" ></Box>
      </HStack>
     );

    
    
     })}  
   

         
     </Box>
  <HStack>
   <Input placeholder="hello world " value={val}
      onChange={(e)=>{text(e)}}
      />  
   <Button  
     onClick={e=>Send()}
    >SEND</Button>
  </HStack> 
  </VStack>
    
  </>
    );
}

export default App;
