import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";
import "./NoteForm.css";
import { RichTextEditor } from "@mantine/rte";

const NoteForm = ({ lat, long, setNotes, notes }) => {
	const [noteText, onChange] = useState("");
	const [addNote] = useMutation(ADD_NOTE);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const note = await addNote({
				variables: {
					text: noteText,
					latitude: lat,
					longitude: long,
				},
			});
			console.log(note.data.addNote);
			setNotes([...notes, note.data.addNote]);
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
