import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        // basically name,email,password ko credentials se bahr nikal liye
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.token);
            navigate('/');
        }
        else {
            alert("invalid credentials")
        }
    }


    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name='name' className="form-control" value={credentials.name
                    } id="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
