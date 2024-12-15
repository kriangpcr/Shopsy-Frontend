import React, { useState, useEffect } from 'react';
import App from '../navbar/navbar';
import './product.css'
function product() {
    const [products, setProducts] = useState("");
    const rr = new URLSearchParams(window.location.search);
    const zz = rr.get('id');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const xd = urlParams.get('id');
        if (xd) {
            fetchProducts(xd)
        } else {
        }
    }, []);

    const fetchProducts = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        };
        fetch('http://localhost:3333/productdetail', requestOptions)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                console.log(data.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const fetchBuy = (id, datetime) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: products.price,
                productId: id,
                datetime: datetime.toISOString(),
                name: products.name,
                img: products.img,
                price: products.price
            })
        };

        fetch('http://localhost:3333/buynow', requestOptions)
            .then(response => response.json())
            .then(data => {
                data.error ? alert(data.error) : alert(data.message + " เงินคงเหลือ " + (parseInt(userData.money)-parseInt(products.price)));
                fetchData();
            })
            .catch(error => console.error('Error fetching products:', error));
    };
    const [userData, setUserData] = useState({ fname: '', lname: '', email: '', money: 0, date: "-", phone: "-" });




    const fetchBuasdy = (id, datetime) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch('http://localhost:3333/buynow', requestOptions)
            .then(response => response.json())
    };


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
    const fetchAddToCart = (id) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ Pid: id, name: products.name, price: products.price, img: products.img })
        };

        fetch('http://localhost:3333/addtocart', requestOptions)
            .then(response => response.json())
            .then(data => {
                data.error ? alert(data.error) : alert(data.message);
            })
            .catch(error => console.error('Error adding to cart:', error));
    };
    return (
        <div className='productss'>
            <App />
            <div className=' container-sm mt-4'>
                <div className='bg-light' style={{ borderRadius: "15px" }}>
                    {products && (
                        <div class="row">
                            <div class="col align-self-start text-center my-4">
                                <img src={products.img} alt="" />
                            </div>
                            <div class="col align-self-start mt-3">
                                <div className='fs-4' style={{ marginRight: "30px" }}>{products.name}  </div>
                                <div className='fs-4 mt-4'>฿ {products.price}</div>
                                <div className='mt-4'>
                                    <button class="btn me-4" style={{ backgroundColor: "#83A994", width: "130px" }} onClick={() => fetchBuy(zz, new Date())}>ซื้อเลย</button>
                                    <button
                                        className="btn bg-light"
                                        style={{ width: "130px", border: "1px solid #83A994", color: "#83A994" }}
                                        onClick={() => fetchAddToCart(products.Pid)}
                                    >
                                        <i className="bi bi-cart"></i>เพิ่มลงตะกร้า
                                    </button>
                                </div>
                                <div className=' bg-light mt-4' style={{ borderRadius: "15px" }}>
                                    <div>หมวดหมู่ : <span style={{ color: "grey" }}>{products.catalog}</span> </div>
                                    <div className=' me-3'>คำอธิบาย : <span style={{ color: "grey" }}>{products.description}</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default product