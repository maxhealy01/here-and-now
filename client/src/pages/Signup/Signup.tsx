import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

function Signup() {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		username: "",
	});
	const [addUser] = useMutation(ADD_USER);

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				email: formState.email,
				password: formState.password,
				username: formState.username,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div className="container my-1">
			<form onSubmit={handleFormSubmit} className="loginForm">
				<h2>Signup</h2>
				<div className="flex-row space-between my-2">
					<label htmlFor="username">Username:</label>
					<input
						placeholder="First"
						name="username"
						type="username"
						id="username"
						onChange={handleChange}
					/>
				</div>
				<div className="flex-row space-between my-2">
					<label htmlFor="email">Email:</label>
					<input
						placeholder="youremail@test.com"
						name="email"
						type="email"
						id="email"
						onChange={handleChange}
					/>
				</div>
				<div className="flex-row space-between my-2">
					<label htmlFor="pwd">Password:</label>
					<input
						placeholder="******"
						name="password"
						type="password"
						id="pwd"
						onChange={handleChange}
					/>
				</div>
				<div className="flex-row flex-end">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
