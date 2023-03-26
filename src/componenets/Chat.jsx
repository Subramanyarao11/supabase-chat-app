import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient'
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        getMessages();
    }, []);

    async function getMessages() {
        const { data } = await supabase.from("messages").select();
        setMessages(data);
        // console.log(messages)
    }

    return (
        <>
            <main className="flex flex-col p-[10px]">
                {/* Style fixing */}
                {/* bg-gray-100 shadow-xl border relative */}
                {messages &&
                    messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
            </main>
            <SendMessage scroll={scroll} />
            <span ref={scroll}></span>
        </>
    );
};

export default Chat;
