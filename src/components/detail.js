import React from 'react';
import history from '../common/history';
import { GoogleLogout } from 'react-google-login';
import API from '../common/api'
// import ReactTimeAgo from "react-time-ago";
const clientId = '386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com';

export default class Detail extends React.Component {
  state = {
    data: "",
    page: 1,
    btn_load: true,
    description: "",
    location: "",
    fulltime: false,
    reset: false
  }

  logOut = () => {
    history.push("/")
  };

  componentDidMount() {
    let index = window.location.pathname.split("/"),
      id = index[index.length - 1];
    API.get("api/recruitment/positions/" + id).then(res => {
      console.log(res)
      console.log(res.data)
      this.setState({ data: res.data })
    })
  }

  render() {
    let { data } = this.state
    return (
      <main className="">
        <header className="d-flex justify-content-between">
          <h1>GitHub Jobs</h1>
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            render={renderProps => (
              <button className='btn btn-danger' onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
            )}
            onLogoutSuccess={this.logOut} />
        </header>
        <div className='cursor-pointer' onClick={() => history.push("/home")}>
          <p style={{ color: "royalblue", paddingLeft: "5px" }}><b> Back</b></p>
        </div>
        <div style={{ height: "100%", border: "5px solid lightgrey", padding: "10px 20px" }}>
          <div>
            <p style={{ marginBottom: "0", color: "darkgrey" }}>{data.type} / {data.location}</p>
            <h2 style={{ marginTop: "0", color: "midnightblue" }}>{data.title}</h2>
          </div>
          <hr />
          <div className='row'>
            <div className='col-8'>
              <div
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            <div className='col-4'>
              <div style={{ height: "150px", border: "5px solid lightgrey" }}>
                <div className="d-flex justify-content-between" style={{ borderBottom: "3px solid lightgrey", margin: "0", padding: "7px" }}>
                  <h4 >{data.company}</h4>
                  <a href="#" style={{ textDecoration: "none", color: "cornflowerblue" }}>1 Other Job</a>
                </div>
                {/* <h4 style={{ borderBottom: "3px solid lightgrey", margin: "0", padding: "7px" }}>{data.company}</h4>
                <a href="#" style={{ textDecoration: "none", color: "cornflowerblue" }}>1 Other Job</a> */}
                <img src={data.company_logo} alt={data.company} />
                <br/>
                <br/>
                <a href={data.company_url} style={{ textDecoration: "none", color: "cornflowerblue" }}>{data.company_url}</a>
              </div>
              <br />
              <div className='py-2' style={{ border: "5px solid lightgrey" }}>
                <b>How to apply</b>
              </div>
              <div style={{ border: "5px solid lightgrey", wordBreak: "break-word"}}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
                />
              </div>
            </div>
          </div>

          {/* <div style="display: flex; float: end">
            <div style="width: 70%; padding-right: 50px">
              <h3 style="margin-bottom: 5px">Trade Republic</h3>
              <p style="margin-top: 0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>

              <h3 style="margin-bottom: 5px">What you'll be doing</h3>
              <ul style="margin-top: 0; padding-left: 25px">
                <li>What you'll be doing</li>
                <li>What you'll be doing</li>
                <li>What you'll be doing</li>
                <li>What you'll be doing</li>
                <li>What you'll be doing</li>
              </ul>

              <h3 style="margin-bottom: 5px">What we look for</h3>
              <ul style="margin-top: 0; padding-left: 25px">
                <li>What we look for</li>
                <li>What we look for</li>
                <li>What we look for</li>
                <li>What we look for</li>
                <li>What we look for</li>
              </ul>
            </div>

            <div style="width: 30%">
              <div style="height: 150px; border: 5px solid lightgrey">
                <div style="display: flex">
                  <h4 style="border-bottom: 3px solid lightgrey; margin: 0; padding: 7px">Trade Republic</h4>
                  <a href="/" style="text-decoration: none; color: cornflowerblue">1 Other Job</a>
                </div>
              </div>
              <br />
              <div style="height: 150px; border: 5px solid lightgrey; ">
                <p>tes</p>
              </div>
            </div>
          </div> */}
        </div>
      </main >
    )
  }
} 