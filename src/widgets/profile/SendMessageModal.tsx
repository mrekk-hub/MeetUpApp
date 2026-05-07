import React, { useEffect, useRef, useState } from "react";
import Modal from "../../shared/ui/modal/Modal";
import friendsStore from "../../shared/store/FriendStore";
import "./SendMessageModal.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    friendId: number;
}

const SendMessageModal: React.FC<Props> = ({ isOpen, onClose, friendId }) => {
    const friend = friendsStore.getFriendById(friendId);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState(friendsStore.getMessagesWith(friendId));
    const chatRef = useRef<HTMLDivElement>(null); // ✅ добавляем ref для контейнера чата

    useEffect(() => {
        const interval = setInterval(() => {
            setChat([...friendsStore.getMessagesWith(friendId)]);
        }, 300);
        return () => clearInterval(interval);
    }, [friendId]);

    // ✅ автопрокрутка вниз при изменении чата
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    const handleSend = () => {
        if (!message.trim()) return;
        friendsStore.sendMessage(0, friendId, message.trim());
        setMessage("");
    };

    if (!friend) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="send-message-modal">
            <div className="send-message-modal__container">
                <header className="send-message-modal__header">
                    <h2>Чат с {friend.name}</h2>
                </header>

                <div className="send-message-modal__chat" ref={chatRef}>
                    {chat.length === 0 ? (
                        <p className="send-message-modal__empty">Сообщений пока нет</p>
                    ) : (
                        chat.map((m) => (
                            <div
                                key={m.id}
                                className={`send-message-modal__msg ${
                                    m.fromId === 0 ? "send-message-modal__msg--me" : "send-message-modal__msg--friend"
                                }`}
                            >
                                {m.text}
                                <div className="send-message-modal__time">
                                    {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="send-message-modal__form">
                    <input
                        type="text"
                        placeholder="Введите сообщение..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend}>Отправить</button>
                </div>
            </div>
        </Modal>
    );
};

export default SendMessageModal;
