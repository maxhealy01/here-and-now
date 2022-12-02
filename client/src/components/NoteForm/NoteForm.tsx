import React, { useState } from "react";
import { FetchResult, useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";
import "./NoteForm.css";
import { RichTextEditor } from "@mantine/rte";
import { NoteType as Note } from "../../utils/typeDefs";

type NoteFormProps = {
	lat: number;
	long: number;
	setNotes: (notes: Note[]) => void;
	notes: Note[];
};
const NoteForm: React.FC<NoteFormProps> = ({ lat, long, setNotes, notes }) => {
	const [noteText, onChange] = useState("");
	const [addNote] = useMutation<Note>(ADD_NOTE);

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		try {
			let note:
				| Note
				| FetchResult<
						Record<string, any>,
						Record<string, any>,
						Record<string, any>
				  > = await addNote({
				variables: {
					text: noteText,
					latitude: lat,
					longitude: long,
				},
			});

			setNotes([...notes, note?.data?.addNote]);
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
