import React from 'react';
import Img from 'gatsby-image'

const SingleProduct = ({ product, handleAdd }) => {
    return (<div className="product">


        <Img className="product__img" fluid={product.image.fluid} alt="" />
        <h1 className="product__title">{product.name}</h1>
        <div className="product__bottom">
            <p className="product__price">Price: <span className="bold">{product.price}</span></p>
            <div className="product__add"><button onClick={() => handleAdd(product)}>add to cart</button></div>

        </div>

    </div>);
}

export default SingleProduct;