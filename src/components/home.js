import React from 'react';
import history from '../common/history';
import { GoogleLogout } from 'react-google-login';
import API from '../common/api'
import ReactTimeAgo from "react-time-ago";
const clientId = '386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com';

export default class Home extends React.Component {
  state = {
    job: [],
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
    API.get("api/recruitment/positions.json?page=1").then(res => {
      console.log(res.data)
      this.setState({ job: res.data })
    })
  }

  loadMore = () => {
    let { job, page } = this.state
    page = page + 1
    API.get("api/recruitment/positions.json?page=" + page).then(res => {

      res.data.map(jobs =>
        jobs !== null && job.push(jobs)
      )
      this.setState({ job, page })
    }).catch(err => {
      this.setState({ btn_load: !this.state.btn_load })
    })
  };

  search = () => {
    let { job, page, description, location, fulltime } = this.state
    page = 1
    if (description.length > 0 && location.length > 0) {
      API.get("api/recruitment/positions.json?page=" + page + "&description=" + description + "&location=" + location + "&full_time=" + fulltime).then(res => {
        job = []
        res.data.map(jobs =>
          jobs !== null && job.push(jobs)
        )
        this.setState({ job, page, btn_load: !this.state.btn_load, reset: !this.state.reset })
      }).catch(err => {
        this.setState({ btn_load: !this.state.btn_load, job: [] })
      })
    }
    else {
      alert("Description and Location Cannot Empty");
    }
  };

  reset = () => {
    API.get("api/recruitment/positions.json?page=1").then(res => {
      this.setState({ job: res.data })
    })
    this.setState({
      page: 1,
      btn_load: true,
      description: "",
      location: "",
      fulltime: false,
      reset: false
    })
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
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
        <div class="d-flex row g-3 mx-2 align-items-end">
          <div class="col-md-4">
            <label for="description" class="form-label">Job Description</label>
            <input type="text" class="form-control" id="description" value={this.state.description} disabled={this.state.reset ? true : ""} onChange={this.handleChange} />
          </div>
          <div class="col-md-4">
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" id="location" value={this.state.location} disabled={this.state.reset ? true : ""} onChange={this.handleChange} />
          </div>
          {/* <div class="col-md-3">
            <label for="Location" class="form-label">Full Time Only</label>
            <input type="text" class="form-control" id="Location" />
          </div> */}
          <div class="form-check col-2-5">
            <input class="form-check-input" type="checkbox" disabled={this.state.reset ? true : ""} onClick={() => this.setState({ fulltime: !this.state.fulltime })} checked={this.state.fulltime ? true : ""} id="flexCheckChecked" />
            <label class="form-check-label" for="flexCheckChecked">
              Full Time Only
            </label>
          </div>
          <div class="col-1">
            {
              this.state.reset ? <button class="btn btn-danger" onClick={this.reset}>Reset</button> : <button class="btn btn-primary" onClick={this.search}>Search</button>
            }
            {/* <button class="btn btn-primary" onClick={this.search}>Search</button> */}
          </div>
        </div>
        <div class="card my-2 mx-3">
          <div class="card-header">
            <h5>
              Job List
            </h5>
          </div>
          <div class="card-body">
            {
              Array.isArray(this.state.job) ?
                this.state.job.map(jobs =>
                  <div className='d-flex justify-content-between border-top cursor-pointer' onClick={() => history.push("detail/"+jobs.id)}>
                    <div>
                      <p className='title'>{jobs.title}</p>
                      <p>{jobs.company} - {jobs.type}</p>
                    </div>
                    <div className='text-end'>
                      <p>{jobs.location}</p>
                      {jobs.created_at ? <p><ReactTimeAgo date={jobs.created_at} locale="en-US" /></p> : ""}
                    </div>
                  </div>

                )
                : ""
            }
          </div>
          {this.state.btn_load && <button className='d-block btn btn-primary mb-2 mx-2' onClick={this.loadMore}>More Jobs</button>}
        </div>
      </main>
    )
  }
} 