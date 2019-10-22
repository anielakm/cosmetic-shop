import React from 'react';
import SingleProduct from '../components/SingleProduct'
import { StaticQuery, graphql } from "gatsby"

const ProductsList = ({ data, filter, handleAdd }) => {

  const sortByName = () => {

    let items = [...data.allContentfulShopItems.edges];
    items.sort(compare);

    function compare(x, y) {
      const nameX = x.node.name.toUpperCase();
      const nameY = y.node.name.toUpperCase();

      let comparsion = 0;
      if (nameX > nameY) { comparsion = 1 }
      else if (nameX <= nameY) { comparsion = -1 };
      return comparsion;
    }

    return items;

  }

  const sortByPrice = () => {

    let items = [...data.allContentfulShopItems.edges];
    items.sort(compare);

    function compare(x, y) {
      const priceX = x.node.price;
      const priceY = y.node.price;

      let comparsion = 0;
      if (priceX > priceY) { comparsion = 1 }
      else if (priceX <= priceY) { comparsion = -1 };
      return comparsion;
    }

    return items;

  }

  let sortedByName = sortByName().map(item => <SingleProduct product={item.node} key={item.node.id} handleAdd={handleAdd} />);
  let sortedByPrice = sortByPrice().map(item => <SingleProduct product={item.node} key={item.node.id} handleAdd={handleAdd} />);
  let items = data.allContentfulShopItems.edges.map(item => <SingleProduct product={item.node} key={item.node.id} handleAdd={handleAdd} />);

  const displayItems = () => {
    if (filter === 'name') {
      return sortedByName;
    } else if (filter === 'price') {
      return sortedByPrice;
    } else {
      return items;
    }

  }

  return (<div className="list">

    {displayItems().length === 0 ? <p className="list__loading">Loading products ... </p> : displayItems()}

  </div>);
}


export default props => (
  <StaticQuery
    query={graphql`
        query {
            allContentfulShopItems{
              edges{
                node{
                  id
                  name
                  price
                  image{
                    fluid(maxWidth:500){
                        src
                    }
                  }
                  description{
                    description
                  }
                }
              }
            }
          }
      `}
    render={data => <ProductsList data={data} {...props} />}
  />
)


