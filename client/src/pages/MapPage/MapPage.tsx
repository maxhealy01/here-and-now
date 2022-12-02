import React from "react";
import WrappedMap from "../../components/Map/Map";
import NoteForm from "../../components/NoteForm/NoteForm";
import SelectedNote from "../../components/SelectedNote/SelectedNote";
import { NoteType as Note } from "../../utils/typeDefs";

type MapPageProps = {
	setSelectedNote: (note: Note) => void;
	selectedNote: Note;
	setNotes: (notes: Note[]) => void;
	notes: Note[];
	latitude: number;
	longitude: number;
};

const MapPage: React.FC<MapPageProps> = ({
	setSelectedNote,
	selectedNote,
	setNotes,
	notes,
	latitude,
	longitude,
}) => {
	return (
		<div className="map">
			<WrappedMap
				setSelectedNote={setSelectedNote}
				notes={notes}
				latitude={latitude}
				longitude={longitude}
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAE5FDeD7mf02RHDXEu2SzZWlrWJCbwSw"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
			<div className="notesOrComments">
				{selectedNote.text ? (
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
