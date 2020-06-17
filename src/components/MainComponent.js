import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Header from './header'
import Footer from './footer';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments'
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishId = ({match}) => {
      console.log(match);
      return(
       <DishDetail  dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.id,10))[0]} 
       comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.id,10))}/>
      );
    }


    return (
      <div>
        <Header />
        <Switch>
          <Route path='/contactus' component={Contact} />
          <Route path='/home' component={HomePage} />
          <Route path='/about' component={()=> <About leaders={this.props.leaders}/>}/>
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:id' component={DishId}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default (connect(mapStateToProps)(Main));