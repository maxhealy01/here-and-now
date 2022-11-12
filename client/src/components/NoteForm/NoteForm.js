import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_NOTE } from "../../utils/mutations";
import "./NoteForm.css";
import { RichTextEditor } from "@mantine/rte";
import { ObjectId } from "mongodb";

const NoteForm = ({ lat, long, setNotes, notes }) => {
	const [noteText, onChange] = useState("");
	const [addNote] = useMutation(ADD_NOTE);

	// Set the username, so that when the notes are refreshed they will show the proper username.
	const [userId, setId] = useState("anonymous");
	const { data } = useQuery(QUERY_ME, {
		onCompleted: () => setId(data.me.username),
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(notes);
		try {
			await addNote({
				variables: { text: noteText, latitude: lat, longitude: long },
			});
			setNotes([
				...notes,
				{
					_id: ObjectId().toString(),

					text: noteText,
					latitude: lat,
					longitude: long,
					comments: [],
					username: userId,
					createdAt: "just now",
				},
			]);
			onChange("");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="formContainer">
			<form onSubmit={handleFormSubmit}>
				<div className="noteTextarea"></div>
				<RichTextEditor
					data-testid="text-editor"
					id="rte"
					controls={[
						["bold", "italic", "underline"],
						["unorderedList", "h1", "h2", "h3"],
						["sup", "sub"],
						["alignLeft", "alignCenter", "alignRight"],
					]}
					placeholder="Write a note that will appear on the map!"
					value={noteText}
					onChange={onChange}
				/>
				<div className="center">
					<button type="submit">Post</button>
				</div>
			</form>
		</div>
	);
};

export default NoteForm;
