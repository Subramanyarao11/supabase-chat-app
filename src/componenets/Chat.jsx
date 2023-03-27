import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient'
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        async function getMessages() {
            const { data: messages , error } = await supabase.from("messages").select();
            if(error) {
                console.error(error);
                return;
            }
            setMessages(messages);
            setloading(false)
            // console.log(messages)
        }
        getMessages();

        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                },
                (payload) => {
                    setMessages((messages) => [...messages, payload.new])
                }
            )
            .subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, []);


    return (
        <div>{
            loading ? (<div className='text-center text-2xl font-medium text-[#395dff]'>Loading Chats...</div>) : (
                <>
                <main className='p-2.5 h-[80vh] custom-margin overflow-y-scroll flex flex-col'>
                  {messages.map((message) => (
                    <Message key={message.id} message = {message} />
                  ))}
                  <span ref={scroll}></span>
                </main>
                <SendMessage scroll={scroll}/>
              </>
            )
            }</div>

      );

    }

export default Chat;
