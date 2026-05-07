// src/shared/stores/friendsStore.ts
import { makeAutoObservable } from "mobx";

export interface Message {
    id: number;
    fromId: number; // my user id (0 for me) or friend id
    toId: number;
    text: string;
    createdAt: string; // ISO
}

export interface Friend {
    id: number;
    name: string;
    avatar?: string | null;
    addedAt: string;
    lastSeen?: string | null;
}

const STORAGE_KEY = "friends_data_v1";

class FriendsStore {
    friends: Friend[] = [];
    messages: Message[] = [];

    constructor() {
        makeAutoObservable(this);
        this.load();

        if (this.friends.length === 0) {
            this.addFriend({ name: "Алексей" });

            this.sendMessage(0, this.friends[0].id, "Привет, Алексей!");
            this.sendMessage(this.friends[0].id, 0, "Привет! Как дела?");
        }
    }

    private load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            this.friends = Array.isArray(parsed.friends) ? parsed.friends : [];
            this.messages = Array.isArray(parsed.messages) ? parsed.messages : [];
        } catch (e) {
            console.error("Failed to load friends store", e);
        }
    }

    private save() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ friends: this.friends, messages: this.messages })
            );
        } catch (e) {
            console.error("Failed to save friends store", e);
        }
    }

    addFriend(payload: { name: string; avatar?: string | null }) {
        const newFriend: Friend = {
            id: Date.now(),
            name: payload.name || "Новый друг",
            avatar: payload.avatar ?? null,
            addedAt: new Date().toISOString(),
            lastSeen: null,
        };
        this.friends = [newFriend, ...this.friends];
        this.save();
        return newFriend;
    }

    removeFriend(id: number) {
        this.friends = this.friends.filter((f) => f.id !== id);
        this.messages = this.messages.filter((m) => m.fromId !== id && m.toId !== id);
        this.save();
    }

    sendMessage(fromId: number, toId: number, text: string) {
        const msg: Message = {
            id: Date.now(),
            fromId,
            toId,
            text,
            createdAt: new Date().toISOString(),
        };
        this.messages = [...this.messages, msg];
        this.save();
        return msg;
    }

    getMessagesWith(friendId: number) {
        // messages between me (id 0) and friendId
        return this.messages.filter(
            (m) =>
                (m.fromId === 0 && m.toId === friendId) || (m.fromId === friendId && m.toId === 0)
        );
    }

    getFriendById(id: number) {
        return this.friends.find((f) => f.id === id) ?? null;
    }
}

const friendsStore = new FriendsStore();
export default friendsStore;
