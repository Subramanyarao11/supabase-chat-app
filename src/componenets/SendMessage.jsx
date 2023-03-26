import React, { useState } from 'react';
import { supabase } from '../supabaseClient'

const SendMessage = ({scroll}) => {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message === '') {
        alert('Please enter a valid message')
        return
    }
    try {
        const { error } = await supabase.from("messages").insert([
          {
            message: message,
          },
        ]);

        if (error) {
          console.error(error.message);
        //   Add Toast Later
          return;
        }
        console.log("Sucsessfully sent!");
      } catch (error) {
        console.log("error sending message:", error);
      }
    setMessage('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <form onSubmit={sendMessage} className="h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full text-xl p-3 bg-gray-900 text-white outline-none border-none"
        type='text'
        placeholder='Message'
      />
      <button className="w-[20%] bg-green-500" type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
