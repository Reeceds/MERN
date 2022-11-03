import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuthUpdate } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toggleAuth = useAuthUpdate();

    async function loginUser(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.user) {
            toggleAuth(true);
            localStorage.setItem("user-token", data.user);
            alert("Login successful");
            window.location.href = "/dashboard";
        } else {
            alert("Please check your username and password");
        }
    }

    return (
        <Container>
            <div className="">
                <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Login" />
                </form>
                <p>
                    If you do not have an account, please <Link to="/register">click here to register</Link>
                </p>
            </div>
        </Container>
    );
}

export default Login;
