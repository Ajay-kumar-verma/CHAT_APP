import {Box,Stack,VStack,HStack,Input,Center,Button,Spacer,Text,Select} from '@chakra-ui/react'
import {useState} from 'react';
import io  from "socket.io-client";
const ENDPOINT='localhost:2000';
const  socket= io(ENDPOINT)

function App() {
const [msg,setmsg]=useState([]);
const [val,setval]=useState("");
const [key,setkey]=useState("");
const [type,settype]=useState("");
const text=(e)=>{
   console.log(e.target.value)
   setval(e.target.value);
  }

const Send=()=>{
  if(val=="") return;
 setmsg([...msg,{mine:true,val:val}]); 
 let cipher =Encp_Decyp.En(val,key,type)
 
 socket.emit("msg",cipher);

 //console.log(val," msg sent ");
setval("");  
 } 
 
 socket.on("receive",cipher=>{
  if(cipher==="") return;
 let plaintext=Encp_Decyp.De(cipher,key,type)
  setmsg([...msg,{mine:false,val:plaintext}]); 
 })

 return (
  <>
  <VStack w="100%" h="99vh" bg="#D3D3D3">
      <Center w="90%" h="10vh" bg="white" color="blue" fontSize={40} pl={15} pr={15}  > Secure Chat web Site
 </Center>

 <HStack w="90%" h="10vh" bg="white" color="blue" pl={15} pr={15}  >
 
     <Select  placeholder='Type '
       onChange={(e)=>{settype(e.target.value)}}
      >
     <option value='t1'>type1</option>
      <option value='t2'>type2</option>
     </Select>

    <Center w="100%">Before starting chat please set type and key  for encrption   </Center>
      
      <Input placeholder="Enter key "
              type={type==='t1'?'number':"text"}  
      onChange={(e)=>{setkey(e.target.value)}}
       value={key} 
      />
  
 </HStack>

  <Box  w="90%" h="70vh" bg="white" color="green" fontSize={20} pl={15} pr={15} > 
     
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
  <HStack w="90%" bg="white" color="green" p={15} >
   <Input placeholder="Enter text ..." value={val}
      onChange={(e)=>{text(e)}}
      w="70%"
      h="150%"

    />  
      <Spacer/>
   <Button  w="30%"  h="150%" 
     onClick={e=>Send()}
    >SEND</Button>
  </HStack> 
  </VStack>
    
  </>
    );
}

export default App;








class Encp_Decyp{
  // TYPE 1 (one) 
  static t1En(plain,key){
     let chr=plain.split(""); 
     let code=[]; chr.forEach(e=>code.push(e.charCodeAt()));
     let Ecode=[]; code.forEach(e=>Ecode.push(e+parseInt(key)));
     let cipher=[]; Ecode.forEach(e=>cipher.push(String.fromCharCode(e)));
     return cipher.join("");
  }
  static t1De(cipher,key){
    let  Ecode=[];
    cipher.split("").forEach(e=>Ecode.push(e.charCodeAt()))
    let Dcode=[];Ecode.forEach(e=>Dcode.push(e-parseInt(key)));
    let plaintext=[]; Dcode.forEach(e=>plaintext.push(String.fromCharCode(e)));
    return plaintext.join("");
  }  
  
  static t2En(plain,key){
     let chr=plain.split(""); 
     let code=[]; chr.forEach(e=>code.push(e.charCodeAt()));
     let keyCode=[]; key.split("").forEach(e=>keyCode.push(e.charCodeAt()));
     let keyLen=key.length; 
    
     let Ecode=[]; let i=0;
       code.forEach(e=>{  
            let x=e+keyCode[parseInt(i++/keyLen)];
            Ecode.push(String.fromCharCode(x));
         });
     return Ecode.join("");
  }
  
  static t2De(cipher,key){
     let  Ecode=[];
     cipher.split("").forEach(e=>Ecode.push(e.charCodeAt()))
     let keyCode=[]; key.split("").forEach(e=>keyCode.push(e.charCodeAt()));
     let keyLen=key.length; 
     let Dcode=[]; let i=0;
     Ecode.forEach(e=>{  
            let x=e-keyCode[parseInt(i++/keyLen)];
            Dcode.push(String.fromCharCode(x))
         });
     
        return Dcode.join(""); 
  }
  
  static En(text,key,type){
     if(type==="t1")
      return Encp_Decyp.t1En(text,key+0);
     if(type==="t2")
     return Encp_Decyp.t2En(text,key+"1234");
     else 
      return "error"; 
   }  
   static De(text,key,type){
     if(type==="t1")  
        return this.t1De(text,key+0);
     if(type==="t2")  
       return this.t2De(text,key+"1234");
     else 
      return "Error";
   }
  }
  