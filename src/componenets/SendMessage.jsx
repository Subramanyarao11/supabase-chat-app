import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Message from './Message'

const SendMessage = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const scroll = useRef(null)

    useEffect(() => {
        // const messagesSubscription = supabase
        //   .from('messages')
        //   .on('INSERT', (payload) => {
        //     setMessages((messages) => [...messages, payload.new])
        //   })
        //   .subscribe()

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
    }, [])


    const sendMessage = async (e) => {
        e.preventDefault()

        if (message === '') {
            alert('Please enter a valid message')
            return
        }

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
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                {messages &&
                    messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                <div ref={scroll} />
            </div>
            <form onSubmit={sendMessage} className="h-14 w-full max-w-[728px]  flex text-xl">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xl p-3 bg-gray-900 text-white outline-none border-none"
                    type="text"
                    placeholder="Message"
                />
                <button className="w-[20%] bg-green-500" type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}

export default SendMessage
