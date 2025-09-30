import { useEffect, useRef, useState } from "react";

const ChatPage = () => {
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState();

  const inputRef = useRef();

  const sendMessage = () => {
    if (!socket) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (event) => {
      alert(event.data);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl mt-5">Chat Page</div>
      <div className="flex flex-col gap-y-5  mt-10">
        <input
          ref={inputRef}
          className="input input-accent"
          placeholder="type message"
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
