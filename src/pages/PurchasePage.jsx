import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPen, faUser, faList, faTicket, faImage } from '@fortawesome/free-solid-svg-icons'
import '../css/Purchase.css';
import Aa from '../navbar/navbar'

function PurchasePage() {
    const [userData, setUserData] = useState({ fname: '', lname: '', email: '', money: 0 });
    const [purchaseHistory, setPurchaseHistory] = useState([]);

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

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const datainfo = await responseinfo.json();
            setUserData({ fname: datainfo.user.fname, lname: datainfo.user.lname, email: datainfo.user.email, money: datainfo.user.money, date: new Date(datainfo.user.birth).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }), phone: datainfo.user.phone });
            const historyResponse = await fetch('http://localhost:3333/historybuy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!historyResponse.ok) {
                throw new Error('Failed to fetch purchase history');
            }

            const historyData = await historyResponse.json();
            setPurchaseHistory(historyData.history);

        } catch (error) {
            console.error('Error:', error.message);
            localStorage.removeItem('token');
            window.location = '/login'
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(purchaseHistory);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/login'
    };

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch('http://localhost:3333/productdetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    console.log(purchaseHistory);
    return (
        <div>
            <Aa />
            <div className='main'>
                <div className='blog1'>
                    <div className='Propicture'><img style={{ width: '45%', borderRadius: "100%" }} src="https://th.bing.com/th/id/R.155e15100fc57b8e45c64ba26ad3d13c?rik=03Qre%2fUc5%2fYrbQ&riu=http%3a%2f%2fshastapatients.com%2fwp-content%2fuploads%2f2017%2f05%2fblank-profile-picture-973460-1200x1200.png&ehk=tYgrBY0LS5GH63SIyPJoVUoUatTZ16qFegcuMiqapyA%3d&risl=&pid=ImgRaw&r=0" /></div>
                    <div className='UName'>{userData.fname + "  " + userData.lname}</div>
                    <span className='Mypersonal'><a href="/profile"><button className="butt" >My personal</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/edit"><button className="butt" >Edit Account</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/historybuy"><button className="butt" >Purchase History</button></a></span><br />
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><a href="/topup"><button className="butt" > Balance</button></a></span>
                    <span className='Mypersonal' style={{ marginTop: '20px' }}><button onClick={handleLogout} className="butt" > Log out</button></span>
                </div>
                <div className='Sblog2'>
                    <div className='Psecblocg2'>
                        <div className='klong'>
                            {purchaseHistory.slice().reverse().map((item, index) => (
                                <div key={index} className='secklong'>
                                    <img style={{ width: '12%', margin: "30px" }} src={item.img} />
                                    <div className='Pdetail'>
                                        <div style={{ marginTop: '30px', fontSize: '20px' }}>
                                            {item.name.length > 70 ? `${item.name.substring(0, 70)}...` : item.name}
                                        </div>
                                        <div className='color1'>
                                            {new Date(item.date).toLocaleString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: false // Display in 24-hour format
                                            })}
                                        </div>
                                        <div className='Pprice'>฿ {item.price}</div>
                                        <div></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchasePage;
