import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card'
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
        <Card products={products}></Card>
    )
}
export default Products;