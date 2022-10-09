import { ObjectId } from "mongodb";

export const exampleNotes = [
	{
		_id: ObjectId().toString(),
		text: "I saw a goofy guy trying to sell cigarettes to a minor. Watch out!",
		latitude: 30.3132001,
		longitude: -97.6709421,
		username: "SaltySimon",
		comments: [],
		createdAt: "Nov 27th, 2021 at 8:54 pm",
	},
];
