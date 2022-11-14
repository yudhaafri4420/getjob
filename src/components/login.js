import React from 'react';
import logo from '../logo.svg';
import history from '../common/history';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
const clientId = '386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com';

export default class Login extends React.Component {
  state = {
    profile: []
  }

  onSuccess = (res) => {
    this.setState({profile: res.profileObj});
    console.log(res)
    history.push("/home")
  };

  onFailure = (err) => {
    console.log('failed', err);
  };

  componentDidMount() {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />  
        </header>
      </div>
    )
  }
}