import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function loginUser(e){
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if(data.user){
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href = '/dashboard'
        } else {
            alert('Please check your username and password')
        }

    }

    
    return (
        <div className="">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}

export default Login;
