import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Login() {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN);

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: { email: formState.email, password: formState.password },
			});
			const token = mutationResponse.data.login.token;
			Auth.login(token);
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div className="container my-1">
			<form onSubmit={handleFormSubmit} className="loginForm">
				<h2>Login</h2>

				<div className="flex-row space-between my-2">
					<label htmlFor="email">Email address:</label>
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
				{error ? (
					<div>
						<p className="error-text">The provided credentials are incorrect</p>
					</div>
				) : null}
				<div className="flex-row flex-end">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
