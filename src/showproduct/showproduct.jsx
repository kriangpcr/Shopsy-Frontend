import React, { useState, useEffect } from 'react';
import './showproduct.css';
import App from '../navbar/navbar';

function ShowProduct() {
    const [products, setProducts] = useState(null);
    const [catalog, setCatalog] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('catalog');
        if (category) {
            setCatalog(category);
            fetchProducts(category);
            console.log(products);
        } else {
        }
    }, []); // Add window.location.search as a dependency



    const fetchProducts = (category) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catalog: category })
        };

        fetch('http://localhost:3333/products', requestOptions)
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching products:', error));
    };

    return (
        <>
            <App />
            <div className="container mt-4">
                <div className='mb-3'>
                    <span>Search {catalog}</span>
                </div>

                <div className='allproduct'>
                    {products ? (
                        products.map((product, index) => (
                            <div key={index} style={{ display: "inline" }}>
                            <a href={"/product?id=" + product.Pid} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='productyoy'>
                                    <img src={product.img} alt="" />
                                    <div className='nameproduct'>{product.name.length > 15 ? product.name.substring(0, 50) + '...' : product.name}</div>
                                    <div>
                                        <div className='price1'>{product.price} ฿</div>
                                        <span>ขายไปแล้ว {product.sold} ชิ้น</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ShowProduct;
