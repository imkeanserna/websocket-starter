import { useEffect, useState } from 'react'

const useSocket = () => {
  const socket = new WebSocket("ws://localhost:8080")
    return socket;
}

function App() {
  const socket = useSocket();
  const [count, setCount] = useState(0)

  useEffect(() => {
    socket.onopen = () => {
      console.log("Connection established")
      socket.send(JSON.stringify(count))
    }
    socket.onmessage = (message: any) => {
      console.log("Count: ", message.data);
    }
    return () => socket.close();
  }, [count])

  return <div>
    <button onClick={() => {
      setCount(count => count + 1)
    }}>
      Click me {count}
    </button>
      Home React App
  </div>
}

export default App
