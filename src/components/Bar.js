import React from 'react';
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Bar = ({ handleSelect, card, handleAmmount, handleDelete, isCardOpen, handleCard }) => {

    let cardItems = card.map(item => <li className="card__item" key={item.id}>
        <Img className="card__img" fluid={item.image.fluid} alt="" />
        <h1 className="card__title">{item.name}</h1>
        <div className="card__ammount">
            Ammount:
        <div className="card__ammountContainer">

                <div className="card__ammountValue">
                    <input type="number" className="card__input" value={item.ammount} /><br />
                </div>
                <div className="card__buttons">
                    <button className="card__button" onClick={() => handleAmmount(item, 'plus')}>+</button>
                    <button className="card__button" onClick={() => handleAmmount(item, 'minus')}>-</button>
                </div>

            </div>
        </div>
        <p className="card__price">price: <br /><span className="bold">{(item.price * item.ammount).toFixed(2)}</span></p>
        <button className="card__delete" onClick={() => handleDelete(item)}>X</button>
    </li>);

    return (

        <aside className="bar">
            <div className="bar__container">

                <div className="bar__filter">
                    Sort by:
                    <select name="sort" className="bar__select" onChange={handleSelect}>

                        <option value="none">-</option>
                        <option value="name">Name: A-Z</option>
                        <option value="price">Price: from lowest to highest </option>
                    </select>
                </div>

                <div className="bar__card">
                    {isCardOpen ? <span onClick={handleCard}>Close</span> : <span onClick={handleCard}><FontAwesomeIcon icon={faShoppingCart} /> ({card.length}) </span>}
                    <div className="card" style={isCardOpen ? { display: 'block' } : { display: 'none' }}>
                        <ul className="card__list">
                            {card.length === 0 ? (<p className="card__empty">your cart is empty</p>) : cardItems}

                        </ul>
                    </div>
                </div>

            </div>
        </aside>
    );
}

export default Bar;