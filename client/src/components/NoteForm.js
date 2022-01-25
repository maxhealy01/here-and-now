import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_NOTE } from "../utils/mutations";

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
		<div>
			<form
				className="flex-row justify-center justify-space-between-md align-stretch"
				onSubmit={handleFormSubmit}
			>
				<textarea
					placeholder="Write a note that will appear on the map!"
					value={noteText}
					className="form-input col-12 col-md-9"
					onChange={handleChange}
				/>
				<button className="btn col-12 col-md-3" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default NoteForm;
