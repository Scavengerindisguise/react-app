import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Header from './header'
import Footer from './footer';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments'
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      // selectedDish: null
    };
  }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId});
  //   console.log(this.state.selectedDish);
  // }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishId = ({match}) => {
      console.log(match);
      return(
       <DishDetail  dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.id,10))[0]} 
       comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.id,10))}/>
      );
    }


    return (
      <div>
        <Header />
        <Switch>
          <Route path='/contactus' component={Contact} />
          <Route path='/home' component={HomePage} />
          <Route path='/about' component={()=> <About leaders={this.state.leaders}/>}/>
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:id' component={DishId}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;