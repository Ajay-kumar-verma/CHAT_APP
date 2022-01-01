const users=[];

const addUser=({id,nme,room})=>
{
nme=nme.trim().toLowerCase();
room=room.trim().toLowerCase(); 

const exits=users.find((user)=>user.room===room&& user.nme===nme);
if(exits)
{
  return {error:"user nam eis taken !"};
}
const user={id,nme,room};
users.push(user);

return user;
}

const removeUser=(id)=>{

const index=users.findIndex((user)=>user.id===id);

if(index!==-1)
{
    return users.splice(index,1)[0];
}

}


const getUser=(id)=>{
  return   users.find(user=>user.id===id);
}

const getUsersInRoom=(room)=>{
   return users.filter((user)=>{user.room===room}); 
}

module.exports={addUser,removeUser,getUsersInRoom};