
import {
  Box,
  VStack,
  HStack,
  Input,
  Center,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "localhost:2000";
const socket = io(ENDPOINT);

function App() {
  const [msg, setmsg] = useState([]);
  const [message, setmessage] = useState("");
  const [MyId, setMyId] = useState("");
  
  
  const [senderId, setSenderId] = useState("");  

  const Send = () => {
    if (message == "") return;
    setmsg([...msg, { mine: true, val: message}]);

    socket.emit("msg", { message, senderId });
    setmessage("");
  };

  socket.on("receive", (message) => {
    setmsg([...msg, { mine: false, val: message }]);
    return;
  });

   useEffect(() => setTimeout(() => {
    setMyId(socket.id)
   }, 1000),[]); 

 console.log("MyId", MyId);

  return (
    <>
      <VStack w="100%" h="99vh" bg="#D3D3D3">
        <Center
          w="90%"
          h="10vh"
          bg="white"
          color="blue"
          fontSize={40}
          pl={15}
          pr={15}
        >
          Secure Chat web Site
        </Center>

        <Box
          w="90%"
          h="70vh"
          bg="white"
          color="green"
          fontSize={20}
          pl={15}
          pr={15}
        >
          {msg.map((e) => {
            return e.mine ? (
              <HStack>
                <Box maxW="50%"></Box>
                <Spacer />
                <Box maxW="50%">{e.val}</Box>
              </HStack>
            ) : (
              <HStack>
                <Box maxW="50%">{e.val}</Box>
                <Spacer />
                <Box maxW="50%"></Box>
              </HStack>
            );
          })}
        </Box>
        <HStack w="90%" bg="white" color="green" p={15}>
          <Input
            placeholder="Enter text ..."
            value={message.val}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            w="70%"
            h="150%"
          />
          <Input
            placeholder="sender ID"
            value={message.val}
            onChange={(e) => {
              setSenderId(e.target.value);
            }}
            w="70%"
            h="150%"
          />
          <Box>{MyId}</Box>
          <Spacer />
          <Button w="30%" h="150%" onClick={(e) => Send()}>
            SEND
          </Button>
        </HStack>
      </VStack>
    </>
  );
}

export default App;
