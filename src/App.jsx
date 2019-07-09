import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Externals
import { Chart } from 'react-chartjs-2';

// Firebase
import fire from './config/FirebaseConfig'

// Material helpers
import { MuiThemeProvider } from '@material-ui/core/styles';

// ChartJS helpers
import { draw } from './helpers/chartjs';

// Theme
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Routes
import Routes from './Routes';


// Browser history
const browserHistory = createBrowserHistory();

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, { draw });



export default class App extends Component {  
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      // eslint-disable-next-line no-console
      // console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </MuiThemeProvider>
    );
  }
}
