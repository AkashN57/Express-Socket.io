import {useEffect,useState} from "react"
import io from "socket.io-client"
// Making connection to backend
const socket = io.connect("http://localhost:3001")

function App() {
  // const [room,setRoom] = useState('')
  const [message,setMessage] = useState('')
  const [messageRecived,setMessageRecived] = useState('')

  // Join Rooms
  // const joinRoom =()=>{
  //   if(room!=""){
  //     socket.emit("join_room",room)
  //   }
  // }
  function sendMessage(){
   socket.emit("send_message",{message:message})
  }

  useEffect(()=>{
    socket.on("recived_message",(data)=>{
      setMessageRecived(data.message)
    })
  },[socket])

  return (
    <div className="App">
      <center>

        {/* <input placeholder="Room..."
        onChange={(e)=>{
            setRoom(e.target.value)
        }}></input>
        <button onClick={joinRoom}>Join Room</button>

        <br></br>
        <br></br> */}

      <input 
      placeholder="Message..." 
      
      onChange={(event)=>{setMessage(event.target.value)
      }}/>

      <button  onClick={sendMessage}>Send Message</button>
      </center>

      <h2>Message : </h2>
      <h1>{messageRecived}</h1>
    </div>
  );
}

export default App;
