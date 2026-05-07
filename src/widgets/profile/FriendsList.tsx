import React from "react";
import { Friend } from "../../shared/store/FriendStore";

interface FriendsListProps {
    friends: Friend[];
    onMessage: (id: number) => void;
    onRemove: (id: number) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends, onMessage, onRemove }) => {
    return (
        <div style={{ display: "grid", gap: 10 }}>
            {friends.map((f) => (
                <div
                    key={f.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 12,
                        border: "1px solid #eee",
                        borderRadius: 12,
                        background: "#fff",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 8,
                                background: "#f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 500,
                                fontSize: 18,
                                color: "#333",
                            }}
                        >
                            {f.avatar ? (
                                <img
                                    src={f.avatar}
                                    alt={f.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 8,
                                    }}
                                />
                            ) : (
                                f.name[0]?.toUpperCase()
                            )}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600 }}>{f.name}</div>
                            <div style={{ fontSize: 12, color: "#666" }}>
                                Добавлен: {new Date(f.addedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            onClick={() => onMessage(f.id)}
                            style={{
                                padding: "8px 10px",
                                borderRadius: 8,
                                border: "1px solid #6C452B",
                                background: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Написать
                        </button>
                        <button
                            onClick={() => onRemove(f.id)}
                            style={{
                                padding: "8px 10px",
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                background: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;
