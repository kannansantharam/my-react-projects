import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(function (res) {
                console.log(res);
                setProducts(res.data)
            })
    }, [])


    return (
        <Card products={products}></Card>
    )
}
export default Products;