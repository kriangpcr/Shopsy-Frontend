import React, { useState, useEffect } from "react";
import Aa from '../navbar/navbar'
import '../css/Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSortDown, faTicket, faCircleRight, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function CartPage() {
    const [counters, setCounters] = useState([0, 0, 0, 0]); // Initialize counters for each product
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items when the component mounts
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3333/showcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            setCartItems(data.cartItems);

        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const incrementCounter = (index) => {
        const newCounters = [...counters];
        newCounters[index] += 1;
        setCounters(newCounters);
    };

    const decrementCounter = (index) => {
        if (counters[index] !== 0) {
            const newCounters = [...counters];
            newCounters[index] -= 1;
            setCounters(newCounters);
        }
    };
    console.log(cartItems);
    return (
        <>
            <Aa />
            {cartItems.map((item, index) => (
                <div key={index} className='NShop'>
                    <div className='secnav'>
                        <input className='checkbox' type="checkbox" />
                        Shopsy
                        <button className="bin"><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>

                    <div className='Product'>
                        <img className='Ppicture' src={item.img} />
                        <div className='detail'>
                            <div className='explain'>{item.name}</div>
                            <div className='color'>asd</div>
                            <div className='price'> ${item.price}</div>
                        </div>
                        <div className='total'>
                            <div className="ticket-amount" >
                                <button
                                    style={{ border: "none", backgroundColor: '#C65757', color: 'white' }}
                                    className="arrow-up"
                                    onClick={() => incrementCounter(0)}> {/* Pass index as argument */}
                                    <i class="bi bi-plus"></i>
                                </button>
                                <span style={{ marginLeft: '10px', marginRight: '10px' }} className="number">{counters[0]}</span> {/* Display counter for product 0 */}
                                <button
                                    style={{ border: "none", backgroundColor: '#C65757', color: 'white' }}
                                    className="arrow-down"
                                    onClick={() => decrementCounter(0)}> {/* Pass index as argument */}
                                    <i class="bi bi-dash"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>))}




            <div className="bottombar">
                <div className="sector1" style={{ display: 'flex' }} >
                    <div className="Bdetail">
                        <FontAwesomeIcon style={{ marginRight: "50px", marginLeft: '20px' }} icon={faTicket} />
                        คูปอง/โค้ดส่วนลด
                    </div>
                    <div className="button-container">
                        <button style={{ border: "none", background: 'transparent' }}>กดเพื่อใช้   <FontAwesomeIcon icon={faCircleRight} /></button>
                    </div>
                </div>

                <div className="sector2" style={{ display: 'flex' }}>
                    <div style={{ fontSize: '25px' }}>
                        <input id="aaa" style={{ marginLeft: '50px', marginTop: '50px' }} className="checkbox" type="checkbox" />
                        ทั้งหมด
                    </div>
                    <div style={{ fontSize: '23px', marginTop: '50px' }} className="tprice">
                        รวม <span style={{ width: "80px ", display: "inline-block", textAlign: "end" }}>{counters.reduce((acc, curr) => acc + curr * 299, 0)} $</span> {/* Calculate total based on counters */}
                    </div>
                    <button className="pay">ชำระเงิน</button>
                </div>

            </div>
        </>
    );
}

export default CartPage;
