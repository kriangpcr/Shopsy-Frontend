import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import Aa from '../navbar/navbar';

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signUpData, setSignUpData] = useState({
        fname: "", 
        lname: "", 
        email: "",
        password: "",
        birth: "-",
        gender: "",
        phone: "",
        username: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    if (isLoggedIn) {
        window.location = '/profile'
    }
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                throw new Error('Login Fail');
            }
            const data = await response.json();
            // Check if there is an error message from the server
            if (data.error) {
                throw new Error(data.error);
            }
            // If successful, do something with the data
            alert("Login Success")
            localStorage.setItem('token',data.token)
            window.location = "/profile"
            // You can redirect or perform other actions here
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message); // Display error message to the user
        }
    };
    

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            });
    
            const data = await response.json();
    
            if (data.error) {
                throw new Error(data.error);
            }
            
            alert("Registration successful");
            
            // Clear the form fields after successful registration
            setSignUpData({
                fname: "",
                lname: "",
                email: "",
                password: "",
                birth: "-",
                gender: "",
                phone: "",
                username: ""
            });
            
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message); 
        }
        console.log(signUpData);
    };
    

    const handleInputChange = (event, formType) => {
        const { name, value } = event.target;
        if (formType === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setSignUpData({ ...signUpData, [name]: value });
        }
    };

    return (
        <div>
            <Aa />

            <div className="loginn" style={{
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "810px", backgroundSize: 'cover', // Ensure the image covers the entire container
                backgroundRepeat: 'no-repeat', // Do not repeat the image
                backgroundPosition: 'center',
                backgroundImage: `url(https://images-ext-1.discordapp.net/external/3QWgKs-IpiA0pjvY1d5Vnukii2AfkPvNaXHbmTdQD_E/%3Ft%3Dst%3D1714470929~exp%3D1714474529~hmac%3D90293847560b3a2bc1743821e185954a6dfd9ca7c676c64fc8b0af8b843c6321%26w%3D1380/https/img.freepik.com/free-vector/wavy-background-with-space-gradient_483537-1891.jpg?format=webp&width=1150&height=671)`
            }}>

                <div className={`container ${isSignUp ? 'active' : ''}`}>

                    <div className="form-container sign-up">
                        <form onSubmit={handleSignUpSubmit}>
                            <h1>Create</h1>
                            <input type="text" name="fname" placeholder="First Name" value={signUpData.fname} onChange={(e) => handleInputChange(e, "signUp")} />
                            <input type="text" name="lname" placeholder="Last Name" value={signUpData.lname} onChange={(e) => handleInputChange(e, "signUp")} />
                            <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={(e) => handleInputChange(e, "signUp")} />
                            <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={(e) => handleInputChange(e, "signUp")} />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form onSubmit={handleLoginSubmit}>
                            <h1>LOG IN</h1>
                            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => handleInputChange(e, "login")} />
                            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => handleInputChange(e, "login")} />
                            <a href="#">Forget Your Password?</a>
                            <button type="submit">LOG IN</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome</h1>
                                <p>มีไอดีหรอกด LOG IN สิ</p>
                                <button className="hidden" onClick={toggleForm}>LOG IN</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Welcome </h1>
                                <p>ไม่มีบัญชีใช่มั้ยกดสร้างบัญชีด้านล่างได้เลย!</p>
                                <button className="hidden" onClick={toggleForm}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
