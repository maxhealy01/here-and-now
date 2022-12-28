import React, { useState } from "react";
import Map from "../../components/Map/Map";
import NoteForm from "../../components/NoteForm/NoteForm";
import SelectedNote from "../../components/SelectedNote/SelectedNote";
import { NoteType as Note } from "../../utils/types";

type MapPageProps = {
	setNotes: (notes: Note[]) => void;
	notes: Note[];
	latitude: number;
	longitude: number;
};

const MapPage = ({ setNotes, notes, latitude, longitude }: MapPageProps) => {
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);

	return (
		<div className="map">
			<Map
				setSelectedNote={setSelectedNote}
				notes={notes}
				latitude={latitude}
				longitude={longitude}
			/>
			<div className="notesOrComments">
				{selectedNote ? (
					<SelectedNote
						selectedNote={selectedNote}
						setSelectedNote={setSelectedNote}
					/>
				) : (
					<NoteForm
						lat={latitude}
						long={longitude}
						setNotes={setNotes}
						notes={notes}
					/>
				)}
			</div>
		</div>
	);
};

export default MapPage;
