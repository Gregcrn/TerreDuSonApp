import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './views/Dashboard';
import CategoryList from './views/CategoryList';
import UserList from './views/UserList';
import Account from './views/Account';
import Settings from './views/Settings';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';
import SubCatList from './views/SubCatList'
import ProductsList from './views/ProductsList';
import BasketList from './views/BasketList';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/tableau-de-bord"
        />
        <Route
          component={Dashboard}
          exact
          path="/tableau-de-bord"
        />
        <Route
          component={UserList}
          exact
          path="/utilisateurs"
        />
        <Route
          component={CategoryList}
          exact
          path="/categories"
        />
        <Route
          component={Account}
          exact
          path="/profil"
        />
        <Route
          component={Settings}
          exact
          path="/preferences"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
          component={SubCatList}
          exact
          path="/categories/:id"
        />
        <Route
          component={ProductsList}
          exact
          path="/categories/:categories_id/:id"
        />
        <Route
          component={BasketList}
          exact
          path="/basketlist"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
