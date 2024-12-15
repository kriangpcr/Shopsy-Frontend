import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPen, faUser, faList, faTicket, faImage } from '@fortawesome/free-solid-svg-icons'
import '../css/First.css'
import Aa from '../navbar/navbar'
import React, { useState, useEffect } from 'react';
function App() {

  const [userData, setUserData] = useState({ fname: '', lname: '', email: '', money: 0, date: "-", phone: "-" });

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
  console.log(userData);

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
          <div className='Asecblocg2'>
            <div className='Depersonal'><span style={{ width: "350px", display: "inline-block" }}>My Personal</span>  <FontAwesomeIcon icon={faUser} style={{ width: "37px" }} /> </div>

            <div className='detaill' style={{ textAlign: "start" }}>
              <div className='subdetail'>
                <div style={{ marginLeft: "40px", fontSize: "20px", width: "300px" }}>First-Name</div>
              </div>
              <div className='subdetail2'>
                <div style={{ marginRight: "20px", fontSize: "20px" }}> {userData.fname}</div>
              </div><br />
            </div>

            <div className='detaill' style={{ textAlign: "start" }}>
              <div className='subdetail'>
                <div style={{ marginLeft: "40px", fontSize: "20px", width: "300px" }}>Last-Name</div>
              </div>
              <div className='subdetail2'>
                <div style={{ marginRight: "20px", fontSize: "20px" }}> {userData.lname}</div>
              </div><br />
            </div>

            <div className='detaill' style={{ textAlign: "start" }}>
              <div className='subdetail'>
                <div style={{ marginLeft: "40px", fontSize: "20px", width: "300px" }}>Email</div>
              </div>
              <div className='subdetail2'>
                <div style={{ marginRight: "20px", fontSize: "20px" }}> {userData.email ? userData.email : "-"}</div>
              </div><br />
            </div>

            <div className='detaill' style={{ textAlign: "start" }}>
              <div className='subdetail'>
                <div style={{ marginLeft: "40px", fontSize: "20px", width: "300px" }}>Date of Birth</div>

              </div>
              <div className='subdetail2'>
                <div style={{ marginRight: "20px", fontSize: "20px" }}> {userData.date ? userData.date : "-"}</div>
              </div><br />
            </div>

            <div className='detaill' style={{ textAlign: "start" }}>
              <div className='subdetail'>
                <div style={{ marginLeft: "40px", fontSize: "20px", width: "300px" }}>Phone</div>

              </div>
              <div className='subdetail2'>
                <div style={{ marginRight: "20px", fontSize: "20px" }}>  {userData.phone ? userData.phone : "-"}</div>
              </div><br />
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default App