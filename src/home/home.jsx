import React, { useState, useEffect } from 'react';
import Slideshow from './slideshow';
import Nav from '../navbar/navbar'
function NavScrollExample() {
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = (category = null) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catalog: category })
        };

        fetch('http://localhost:3333/products', requestOptions)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products)

                console.log(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    };


    const images = [
        'https://img.ltwebstatic.com/images3_ccc/2024/04/19/eb/17135202993c549a59ff920288e77d5db18a66d387_thumbnail_2000x.webp',
        'https://img.ltwebstatic.com/images3_ccc/2024/04/23/a3/17138676382f558943cff52c9aa87c895ed324d9ee_thumbnail_2000x.webp',
        'https://img.ltwebstatic.com/images3_ccc/2024/04/24/c4/17139315262f4f450433aeed2561c3947eb23b9caa_thumbnail_2000x.webp',
        'https://media.discordapp.net/attachments/1062416357213351957/1237031546205241344/IMG_4437.webp?ex=663a2ae7&is=6638d967&hm=86ec650ba337d163ac15460faebc80eacd9f6403c1dcdeebdc71976d202d345f&=&format=webp&width=1440&height=288',
        'https://media.discordapp.net/attachments/1062416357213351957/1237031545810718830/IMG_4436.webp?ex=663a2ae7&is=6638d967&hm=db13215f590f6c4bad7d58b4e17ea951524de406e9c02e3c7d0627542faa5070&=&format=webp&width=1440&height=288'
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        fetchProducts(category);
    };

    if (products === null) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Nav />
            <div className="container mt-4">
                <Slideshow images={images} interval={3000} />
                <table className='catalog m-lg-auto' style={{}}>
                    <tr>
                        <td><a href="/allproduct?catalog=bag" onClick={() => handleCategoryClick('bag')}><img src="src\assets\images\bag.png" alt="bag" /></a></td>
                        <td><a href="/allproduct?catalog=art" onClick={() => handleCategoryClick('art')}><img src="src\assets\images\art.png" alt="art" /></a></td>
                        <td><a href="/allproduct?catalog=child" onClick={() => handleCategoryClick('child')}><img src="src\assets\images\child.png" alt="child" /></a></td>
                        <td><a href="/allproduct?catalog=bra" onClick={() => handleCategoryClick('bra')}><img src="src\assets\images\chunnai.png" alt="bra" /></a></td>
                        <td><a href="/allproduct?catalog=dress" onClick={() => handleCategoryClick('dress')}><img src="src\assets\images\dress.png" alt="dress" /></a></td>
                        <td><a href="/allproduct?catalog=game" onClick={() => handleCategoryClick('game')}><img src="src\assets\images\game.png" alt="game" /></a></td>
                        
                    </tr>
                    <tr>
                        <td><a href="/allproduct?catalog=household" onClick={() => handleCategoryClick('household')}><img src="src\assets\images\household.png" alt="household" /></a></td>
                        <td><a href="/allproduct?catalog=pant" onClick={() => handleCategoryClick('pant')}><img src="src\assets\images\pant.png" alt="pant" /></a></td>
                        <td><a href="/allproduct?catalog=decorations" onClick={() => handleCategoryClick('decorations')}><img src="src\assets\images\pradub.png" alt="decorations" /></a></td>
                        <td><a href="/allproduct?catalog=shoe" onClick={() => handleCategoryClick('shoe')}><img src="src\assets\images\shoe.png" alt="shoe" /></a></td>
                        <td><a href="/allproduct?catalog=snack" onClick={() => handleCategoryClick('snack')}><img src="src\assets\images\snack.png" alt="snack" /></a></td>
                        <td><a href="/allproduct?catalog=equipment" onClick={() => handleCategoryClick('equipment')}><img src="src\assets\images\tool.png" alt="equipment" /></a></td>
                    </tr>
                </table>
                <img className=' w-100 mt-5 mb-5' src="src\assets\images\introduce.png" alt="" />
                <div className='allproduct'>
                    {products.map((product, index) => (
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
                    ))}
                </div>
            </div>
        </>

    );
}

export default NavScrollExample;
