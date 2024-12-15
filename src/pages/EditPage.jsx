import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPen, faUser, faList, faTicket, faImage } from '@fortawesome/free-solid-svg-icons'
import '../css/Edit.css';
import Aa from '../navbar/navbar'

function EditPage() {

    const [userData, setUserData] = useState({ fname: '', lname: '', email: '', money: 0 });

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
            setUserData({ email: data.decoded.email, fname: data.decoded.fname, lname: data.decoded.lname });

            const responseinfo = await fetch('http://localhost:3333/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.decoded.email })
            });

            if (!responseinfo.ok) {
                throw new Error('Failed to fetch user data');
            }
            const datainfo = await responseinfo.json();
            setUserData({ fname: datainfo.user.fname, lname: datainfo.user.lname, email: datainfo.user.email, money: datainfo.user.money, birth: datainfo.user.birth.formatted_date, phone: datainfo.user.phone });

        } catch (error) {
            console.error('Error:', error.message);
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

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch('http://localhost:3333/editinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData) // Assuming userData contains the updated information
            });

            if (!response.ok) {
                throw new Error('Failed to update user info');
            }

            alert('อัพเดตข้อมูลสำเร็จ');

        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to update user info');
        }
    };

    return (
        <div >
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
                    <div className='Esecblocg2'>

                        <div className='editing'>
                            <div className='EditPro'><img style={{ width: "100px", borderRadius: "100%" }} src="https://th.bing.com/th/id/R.155e15100fc57b8e45c64ba26ad3d13c?rik=03Qre%2fUc5%2fYrbQ&riu=http%3a%2f%2fshastapatients.com%2fwp-content%2fuploads%2f2017%2f05%2fblank-profile-picture-973460-1200x1200.png&ehk=tYgrBY0LS5GH63SIyPJoVUoUatTZ16qFegcuMiqapyA%3d&risl=&pid=ImgRaw&r=0" /></div>
                            <div class='name-container'>
                                <div className='ENAme'>{userData.fname+" "+userData.lname}</div>
                                <button style={{ marginTop: '12px' }} className='upload'><FontAwesomeIcon icon={faImage} /> Upload image</button>
                            </div>
                        </div>

                        <div className='inputdetail'>
                            <div className='Fcolumn'>
                                <div style={{ textAlign: 'left' }}>First-Name</div>
                                <input className='inName' type="text" value={userData.fname} onChange={(e) => setUserData({ ...userData, fname: e.target.value })} />
                                <div style={{ height: '50px' }}></div>
                                <div style={{ textAlign: 'left' }}>Email</div>
                                <input className='inName' type="text" value={userData.email} readOnly />
                                <div style={{ height: '50px' }}></div>
                                <div style={{ textAlign: 'left' }}>Date of Birth</div>
                                <input className='inName' type="date" value={userData.birth} onChange={(e) => setUserData({ ...userData, birth: e.target.value })} />


                            </div>
                            <div className='Scolumn'>
                                <div style={{ textAlign: 'left' }}>Last-Name</div>
                                <input className='inName' type="text" value={userData.lname} onChange={(e) => setUserData({ ...userData, lname: e.target.value })} />
                                <div style={{ height: '50px' }}></div>
                                <div style={{ textAlign: 'left' }}>Password</div>
                                <input className='inName' type="text" />
                                <div style={{ height: '50px' }}></div>
                                <div style={{ textAlign: 'left' }}>Phone</div>
                                <input className='inName' type="text" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                            </div>
                        </div>
                        <button style={{ marginBottom: "30px", width: "150px" }} className='upload' onClick={handleSave}>SAVE</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditPage;
