import React from 'react';
import { IconButton, Input, Button, Card } from "@material-tailwind/react";
import { BsArrowBarLeft } from "react-icons/bs";
import  MySpeedDial  from '../../../Components/MySpeedDial';

export default function Index() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Olá! Como posso ajudar?", sender: "bot" },
        { id: 2, text: "Ocorreu um erro no meu pedido.", sender: "user" },
        { id: 3, text: "E um copo quebrou aqui.", sender: "user" },
        { id: 4, text: "OK! Ja vamos ate sua mesa", sender: "bot" },
    ]);

    const [readyMsg, setReadyMsg] = React.useState([
        { id: 1, text: "Queroaaaaaaaa" },
        { id: 2, text: "Nao quero aaaaaaa." },
        { id: 3, text: "Ta aqui aaaaaaa" },
        { id: 4, text: "Atrasado aaa" },
    ]);
    const [inputValue, setInputValue] = React.useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages([...messages, { id: Date.now(), text: inputValue, sender: "user" }]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100">
            <div className="flex items-center w-full p-2 bg-white shadow rounded-b-xl">
                <IconButton
                    variant="text"
                    size="sm"
                    onClick={() => window.history.back()}
                >
                    <BsArrowBarLeft className="w-5 h-5" />
                </IconButton>
                <div className="flex-1 text-center">
                    <p className="text-gray-900 font-medium">Chat</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
            </div>
            {/* <div className="flex gap-2 mb-2 overflow-x-auto mx-2">
                {readyMsg.map((msg) => (
                    <p className='p-2 bg-white rounded-xl border border-gray-300'>{msg.text}</p>
                ))}
            </div> */}
            <MySpeedDial readyMsg={readyMsg}/>
            <div className="p-2 bg-white border-t border-gray-200 flex items-center space-x-2">
                <Input
                    label="Digite sua mensagem..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                    size="md"
                />
                <Button size="md" onClick={handleSend}>
                    Enviar
                </Button>
            </div>
        </div>
    );
}

function MessageBubble({ text, sender }) {
    const isUser = sender === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <Card className={`p-2 max-w-[80%] ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}>
                <p className="text-sm">{text}</p>
            </Card>
        </div>
    );
}
