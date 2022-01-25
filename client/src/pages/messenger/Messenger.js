import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";

import "./messenger.css";

import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

import { MY_CONVOS } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

const Messenger = () => {
	const [conversations, setConversations] = useState("");
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	const [userId, setId] = useState("");

	const { loading, data } = useQuery(MY_CONVOS);
	const [sendMessage] = useMutation(SEND_MESSAGE);
	const scrollRef = useRef();

	useEffect(() => {
		const getConversations = () => {
			setConversations(data.myConversations.conversations);
			setId(data.myConversations.username);
		};
		data && getConversations();
	}, [loading, data]);

	const openMessages = (conversation) => {
		setCurrentChat(conversation);
		setMessages(conversation.messages);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const message = {
			sender: userId,
			text: newMessage,
			conversationId: currentChat._id,
		};
		sendMessage({
			variables: {
				sender: userId,
				text: newMessage,
				conversationId: currentChat._id,
			},
		});
		setMessages([...messages, message]);
		setNewMessage("");
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="messenger">
			<div className="chatMenu">
				<div className="chatMenuWrapper">
					<input
						type="text"
						placeholder="Search for friends"
						className="chatMenuInput"
					/>
					{conversations &&
						conversations.map((conversation) => (
							<div onClick={() => openMessages(conversation)}>
								<Conversation
									conversation={conversation}
									userId={userId}
									key={conversation._id}
								/>
							</div>
						))}
				</div>
			</div>
			<div className="chatBox">
				<div className="chatBoxWrapper">
					{currentChat ? (
						<>
							<div className="chatBoxTop">
								{messages &&
									messages.map((message) => (
										<div ref={scrollRef}>
											<Message
												message={message}
												own={message.sender === userId}
											/>
										</div>
									))}
							</div>
							<div className="chatBoxBottom">
								<textarea
									className="chatMessageInput"
									placeholder="Write something..."
									onChange={(e) => setNewMessage(e.target.value)}
									value={newMessage}
								></textarea>
								<button className="chatSubmitButton" onClick={handleSubmit}>
									Send
								</button>
							</div>
						</>
					) : (
						<span className="noConversationText">
							Open a conversation to start a chat.
						</span>
					)}
				</div>
			</div>
			<div className="chatOnline">
				<div className="chatOnlineWrapper">
					<ChatOnline />
				</div>
			</div>
		</div>
	);
};

export default Messenger;
