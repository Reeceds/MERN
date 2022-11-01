import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function registerUser(e){
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();
        console.log(data)

        if(data.status === 'ok'){
            navigate('/login')
        }
    }

    
    return (
        <Container>
            <div className="">
                <h1>Register</h1>
                <form onSubmit={registerUser}>
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Register"/>
                </form>
                <p>Already have an account, please <Link to="/login">click here to log in</Link></p>
            </div>
        </Container>
    );
}

export default Register;
