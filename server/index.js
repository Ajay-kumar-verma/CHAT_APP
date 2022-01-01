const app=require('express')();
const server=require('http').Server(app);
const router=require('./router');
app.use(router);

const io=require('socket.io')(server,{cors:{origin:'*',methods:["GET","POST"]}});

io.on('connection',socket=>{
socket.emit("WlCm","Welcome ...!");

socket.on('join',data=>{
 data.text="Joined the chat !";
 let {room}=data;
 socket.join(room);
 socket.broadcast.to(room).emit('bdCtMg',data);
 console.log(socket.id,"Joined the room");
 })



socket.on('msg',data=>
{   let {room}=data;
 socket.broadcast.to(room).emit('bdCtMg',data);
// console.log(msg,"Recieve for BroadCast !");
// socket.broadcast.emit("bdCtMg",msg)
//  if(socket.broadcast.emit("bdCtMg",msg))
//  {   
// console.log('Message  Sent from server');
//  }
 
})


// WHEN DISCONNECT
socket.on('disconnect',()=>
  {
   console.log(" User got disconnect !",socket.id);
  }) 


}) 



// SERVER
server.listen('2000',()=>{
console.log("Server is running at 2000 !");
})
