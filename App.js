import React, { Component } from 'react';
import Cards from './Cards';
import SellItem from './SellItem.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import MarketPlace from './MarketPlace';
//import Login from './Login';
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseui from "firebaseui";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
var firebaseConfig = {
	/** enter config*//
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var user = firebase.auth().currentUser;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: undefined,
			name: null,
			email: null
		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	uiConfig = {
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
		// Terms of service url.
		signInSuccessUrl: './home'
	};

	componentDidMount() {
		this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
			this.setState({
				isSignedIn: !!user,
				name: user.displayName,
				email: user.email
			});
		});
	}

	componentWillUnmount() {
		this.unregisterAuthObserver();
	}
	render() {
		return (
			<Router>
				<Navbar fixed="top" bg="light" expand="lg">
					<Navbar.Brand href="/home" to="/home">EasyMate Marketplace</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{this.state.isSignedIn &&
							<Nav className="mr-auto">
								<Nav.Link href="/marketplace" to="/marketplace">Marketplace</Nav.Link>
								<Nav.Link href="/my_listings" to="/my_listings"  >My Listings</Nav.Link>
								<Nav.Link href="/sell_item" to="/sell_item">Sell an item</Nav.Link>
							</Nav>
						}
						<Form inline>
							{this.state.isSignedIn &&
								<Button onClick={() => firebaseApp.auth().signOut()} href="/" to="/" variant="outline-success">Logout</Button>
							}
						</Form>
					</Navbar.Collapse>
				</Navbar>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/my_listings">
						<Cards name={this.state.name} email={this.state.email} />
					</Route>

					<Route path="/sell_item">
						<SellItem name={this.state.name} email={this.state.email}  />
					</Route>
					<Route path="/marketplace">
						<MarketPlace name={this.state.name} email={this.state.email} />
					</Route>
					<Route path="/home">
						<h1 > Congratulations!! {this.state.name}</h1>
						<p >You have succesfully created an account!  </p>
					</Route>
					<Route path="/" redirect to='/home'>
						<h1> Welcome to EazyMate mate!</h1>
						<p>Buying and Selling has never been this easy!  Create an account to join our community</p>
						<StyledFirebaseAuth uiConfig={this.uiConfig}
							firebaseAuth={firebaseApp.auth()} />						
					</Route>
				</Switch>
			</Router >
		);
	}
}

export default App;
