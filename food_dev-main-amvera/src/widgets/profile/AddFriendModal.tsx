// src/widgets/profile/AddFriendModal.tsx
import { useState } from "react";
import Modal from "../../shared/ui/modal/Modal";
import ActiveButton from "../../shared/ui/button/active/ActiveButton";
import "./AddFriendModal.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
}

export default function AddFriendModal({ isOpen, onClose, onAdd }: Props) {
    const [name, setName] = useState("");

    const handleAdd = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Введите имя друга");
            return;
        }
        onAdd(trimmed);
        setName("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="add-friend-modal">
            <h3>Добавить друга</h3>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя друга"
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    marginBottom: 12,
                }}
            />
            <div style={{ display: "flex", gap: 10 }}>
                <button
                    onClick={onClose}
                    style={{
                        padding: "10px 16px",
                        borderRadius: 8,
                        border: "1px solid #6C452B",
                        background: "#fff",
                        color: "#6C452B",
                        cursor: "pointer",
                    }}
                >
                    Отмена
                </button>

                <ActiveButton
                    text="Добавить"
                    onClick={handleAdd}
                    style={{ background: "#db3702", color: "#fff", border: "none", flex: 1 }}
                />
            </div>
        </Modal>
    );
}
