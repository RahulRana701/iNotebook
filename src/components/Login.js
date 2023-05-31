import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


// use history is a hook , jiska use hum page pr redirect hone ke liye krege agr kuch kra to , now usehistory
// is replaced by usenavigate.
const Login = () => {

    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/authentication/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // done because we have to pass email and password
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        // jo success variable banaya humne authentication route mei login ke andr vo isi ke liye banaya tha.

        if (json.success) {
            // saved our token in local storage and redirected
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
        <div className='container my-4'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
