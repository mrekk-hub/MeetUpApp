// src/pages/profile/Profile.tsx
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import friendsStore, { Friend } from "../../shared/store/FriendStore.ts";
import AddFriendModal from "../../widgets/profile/AddFriendModal";
import SendMessageModal from "../../widgets/profile/SendMessageModal";
import ActiveButton from "../../shared/ui/button/active/ActiveButton";
import FriendsList from "../../widgets/profile/FriendsList";
import "./Profile.scss";

const Profile = observer(() => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        setFriends(friendsStore.friends);
        const t = setInterval(() => setFriends([...friendsStore.friends]), 300);
        return () => clearInterval(t);
    }, []);

    const handleAdd = (name: string) => {
        friendsStore.addFriend({ name });
        setFriends([...friendsStore.friends]);
    };

    const handleRemove = (id: number) => {
        if (!confirm("Удалить друга?")) return;
        friendsStore.removeFriend(id);
        setFriends([...friendsStore.friends]);
    };

    return (
        <section className="profile-page">
            <h1 className="profile-title">Профиль</h1>

            <div className="profile-actions">
                <ActiveButton
                    text="Добавить друга"
                    onClick={() => setIsAddOpen(true)}
                    style={{
                        width: "100%",
                        color: "#fff",
                        background: "#db3702",
                        border: "none",
                        marginTop: "16px",
                    }}
                />
            </div>

            <div className="friends-section">
                <h2>Друзья</h2>
                {friends.length === 0 ? (
                    <p className="no-friends">Список друзей пуст</p>
                ) : (
                    <FriendsList
                        friends={friends}
                        onMessage={setActiveChat}
                        onRemove={handleRemove}
                    />
                )}
            </div>

            <AddFriendModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onAdd={handleAdd}
            />

            {activeChat !== null && (
                <SendMessageModal
                    isOpen={activeChat !== null}
                    onClose={() => setActiveChat(null)}
                    friendId={activeChat}
                />
            )}
        </section>
    );
});

export default Profile;
