import React, { useState } from 'react'
import { supabase } from '../supabaseClient'


function SendMessage({ scroll }) {
    const [message, setMessage] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('messages').insert([
                {
                    message: message,
                },
            ])

            if (error) {
                console.error(error.message)
                // Add Toast Later
                return
            }

            console.log('Successfully sent!')
            setMessage('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        } catch (error) {
            console.log('error sending message:', error)
        }
    }

    return (
        <form onSubmit={sendMessage} className="h-[10vh] fixed bottom-0 w-full max-w-[728px] flex text-2xl">
            <input
                value={message}
                className="w-full text-xl p-3 bg-gray-900 text-white outline-none border-none"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice"
            />
            <button className={!message ? 'w-[20%] bg-red-500 cursor-not-allowed' : 'w-[20%] bg-green-500'} type="submit" disabled={!message}>
                Send
            </button>
        </form>
    )
}

export default SendMessage
