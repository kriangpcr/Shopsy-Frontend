import React, { useState, useEffect } from 'react';
import Aa from '../navbar/navbar';

const ProfilePage = () => {
    const [userData, setUserData] = useState({ fname: '', lname: '', email: '', money: 0 });
    const [topUpAmount, setTopUpAmount] = useState(0); // State to hold the top-up amount
    
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            
            const response = await fetch('http://localhost:3333/authen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData({email: data.decoded.email});

            const responseinfo = await fetch('http://localhost:3333/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.decoded.email }) // Assuming you want to fetch user info based on the current user's email
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const datainfo = await responseinfo.json();
            setUserData({ fname: datainfo.user.fname, lname: datainfo.user.lname, email: datainfo.user.email , money: datainfo.user.money });

        } catch (error) {
            console.error('Error:', error.message);
            localStorage.removeItem('token');
            window.location = '/login'
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        window.location = '/login'
    };

    const handleTopUpSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            
            const response = await fetch('http://localhost:3333/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount: topUpAmount,email:userData.email })
            });
    
            if (!response.ok) {
                console.log(userData.email);
                throw new Error('Failed to top-up');
            }
            fetchData();
            
            setTopUpAmount(0);
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to top-up');
        }
    };

    const handleInputChange = (event) => {
        setTopUpAmount(Number(event.target.value));
    };
   
    
    return (
        <>
            <Aa />
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>{userData.fname}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{userData.lname}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <td>Money:</td>
                            <td>{userData.money}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleLogout}>LOG OUT</button>
                <form onSubmit={handleTopUpSubmit}>
                    <input type="number" name="topup" value={topUpAmount} onChange={handleInputChange} />
                    <input type="submit" value="Top Up" />
                </form>
            </div>
        </>
    );
};

export default ProfilePage;
