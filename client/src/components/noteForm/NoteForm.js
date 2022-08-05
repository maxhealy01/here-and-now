import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_NOTE } from "../../utils/mutations";
import "./NoteForm.css";

const NoteForm = ({ lat, long }) => {
	const [noteText, setText] = useState("");
	const [addNote] = useMutation(ADD_NOTE);

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addNote({
				variables: { text: noteText, latitude: lat, longitude: long },
			});
			setText("");
			window.location.reload(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<textarea
				className="noteTextarea"
				placeholder="Write a note that will appear on the map!"
				value={noteText}
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default NoteForm;
