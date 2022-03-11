function Card({ products }) {
    return (
        <div className='card-section'>
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
                            <div className="card-price">
                                <b>${product.price}</b>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Card;