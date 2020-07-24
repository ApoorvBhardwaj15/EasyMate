import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Row, Col, Grid } from 'react-bootstrap';
import firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import  "./Login.css";

class Login extends Component {

render() {
	return (
		<div >   
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
          	
            <StyledFirebaseAuth uiConfig={this.uiConfig}
                                firebaseAuth={firebaseApp.auth()}/>
          </div>
        }
        {this.state.isSignedIn &&
          <div >
            Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
            <a  onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
          </div>
        }
      </div>
	);
}
}

export default Login;
