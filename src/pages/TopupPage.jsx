import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPen, faUser, faList, faTicket, faImage } from '@fortawesome/free-solid-svg-icons';
import '../css/Topup.css';
import Aa from '../navbar/navbar';

function TopupPage() {
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
            setUserData({ email: data.decoded.email });

            const responseinfo = await fetch('http://localhost:3333/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.decoded.email }) // Assuming you want to fetch user info based on the current user's email
            });

            if (!responseinfo.ok) {
                throw new Error('Failed to fetch user data');
            }
            const datainfo = await responseinfo.json();
            setUserData({ fname: datainfo.user.fname, lname: datainfo.user.lname, email: datainfo.user.email, money: datainfo.user.money });

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
                body: JSON.stringify({ amount: topUpAmount, email: userData.email })
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

    const handleButtonClick = (amount) => {
        setTopUpAmount(amount);
    };

    return (
        <div>
            <Aa />
            <div className='main'>
                <div className='blog1'>
                    <div className='Propicture' ><img style={{ width: '45%', borderRadius: "100%" }} src="https://th.bing.com/th/id/R.155e15100fc57b8e45c64ba26ad3d13c?rik=03Qre%2fUc5%2fYrbQ&riu=http%3a%2f%2fshastapatients.com%2fwp-content%2fuploads%2f2017%2f05%2fblank-profile-picture-973460-1200x1200.png&ehk=tYgrBY0LS5GH63SIyPJoVUoUatTZ16qFegcuMiqapyA%3d&risl=&pid=ImgRaw&r=0" /></div>
                    <div className='UName'>{userData.fname + "  " + userData.lname}</div>
                    <span className='Mypersonal'><a href="/profile"><button className="butt" >My personal</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/edit"><button className="butt" >Edit Account</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/historybuy"><button className="butt" >Purchase History</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/topup"><button className="butt" > Balance</button></a></span>
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><button onClick={handleLogout} className="butt" > Log out</button></span>
                </div>

                <div className='blog2'>
                    <div className='Ssecblocg2'>
                        <div className='Balance'>
                            <div className='MBalance'>MyBalance</div>
                            <div className='Money'>{userData.money} $</div>
                        </div>

                        <div className='Balance1'>
                            <form onSubmit={handleTopUpSubmit}>
                                <div className='Amount'>Enter Amount</div>
                                <input className='Term' type="number" name="topup" value={topUpAmount} onChange={handleInputChange} />

                                <div className='easy'>
                                    <button className='choice' onClick={() => handleButtonClick(100)}>100 $</button>
                                    <button className='choice' onClick={() => handleButtonClick(200)}>200 $</button>
                                    <button className='choice' onClick={() => handleButtonClick(300)}>300 $</button>
                                    <button className='choice' onClick={() => handleButtonClick(400)}>400 $</button>
                                    <button className='choice' onClick={() => handleButtonClick(500)}>500 $</button>
                                </div>

                                <input className='conti' type="submit" value="Top Up" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopupPage;
