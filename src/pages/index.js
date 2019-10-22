import React from "react"
import SEO from "../components/seo"
import Bar from '../components/Bar'
import ProductsList from '../components/ProductsList'
import './index.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import ls from 'local-storage'

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: [],
      isCardOpen: false,
      filter: ''
    }
  }

  componentWillMount() {
    localStorage.getItem('cardItems' && this.setState({
      card: JSON.parse(localStorage.getItem('cardItems')),
      isCardOpen: false,
      filter: ''
    }))
  }

  handleSelect = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  handleAdd = (item) => {

    let card = [...this.state.card];
    let ammount;

    // card.indexOf(item) > -1 ? ammount = card[card.indexOf(item)].ammount : ammount = 0;

    // item.ammount = ammount + 1;


    // this.setState({
    //   card: this.state.card.push(item),
    //   ...this.state

    // })

    if (card.indexOf(item) > -1) {
      ammount = card[card.indexOf(item)].ammount;
      ammount++;
      card[card.indexOf(item)].ammount = ammount;
      this.setState({ card })
    } else {
      item.ammount = 1;

      this.setState({
        card: this.state.card.push(item),
        ...this.state

      });
    }


    this.handleCard('open');

  }

  handleAmmount = (item, type) => {

    let cardItems = [...this.state.card];
    let ammount = cardItems[cardItems.indexOf(item)].ammount;

    type === 'plus' ? (
      ammount++
    ) : (ammount--);

    if (ammount === 0) { this.handleDelete(item) }
    else {
      cardItems[cardItems.indexOf(item)].ammount = ammount;
      this.setState({ card: cardItems, ...this.state })
    }


  }

  handleDelete = (item) => {

    let cardItems = [...this.state.card];
    let index = cardItems.indexOf(item);
    cardItems.splice(index, 1);

    this.setState({
      card: cardItems,
    })

  }

  handleCard = (prop) => {
    prop === 'open' ? (
      this.setState({
        isCardOpen: true,
      })) : (
        this.setState({
          isCardOpen: !this.state.isCardOpen
        })
      )


  }


  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('cardItems', JSON.stringify(nextState.card));
  }

  render() {

    return (
      <>
        <SEO title="Home" />
        <Header />
        <Bar handleCard={this.handleCard} isCardOpen={this.state.isCardOpen} handleDelete={this.handleDelete} card={this.state.card} handleSelect={this.handleSelect} handleAmmount={this.handleAmmount} />

        <ProductsList filter={this.state.filter} handleAdd={this.handleAdd} sortByName={this.state.sortByName} sortByPrice={this.state.sortByPrice} />
        <Footer />
      </>
    );
  }
}


export default IndexPage
