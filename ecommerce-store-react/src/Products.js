import React, { useEffect, useState } from 'react';
import './App.css';
function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data)
            })
    }, [])


    return (
        <div>
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className="card">
                            <div className="card-image">
                                <img src={product.image} lazloading="lazy" width="100px" />
                            </div>
                            <div className="card-title">
                                {product.title}
                            </div>
                        </div>)
                })
            }
        </div>
    )
}
export default Products;