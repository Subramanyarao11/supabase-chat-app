import { useEffect, useState } from "react";
import { supabase } from './supabaseClient'
function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
      }, []);

      async function getMessages() {
        const { data } = await supabase.from("messages").select();
        setMessages(data);
      }

  return (
    <>
    <div className="text-center">Hello from Supabase!</div>
    <ul>
        {messages && messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      </>
  )
}

export default App
