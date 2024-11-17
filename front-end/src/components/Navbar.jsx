import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import emblem from '../images/emblem.svg'
import '../css/Navbar.css'

const Navbar = (props) => {

  const [isActive, setActive] = useState(true);

  const RenderMenu = () =>{

      return(
        (props.isAdmin) ? 
          <>
            <li className={(isActive) ? "active nav-item": "nav-item"}>
                <NavLink className="nav-link" exact activeClassName="active" to="/admin/">Create Tender<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/admin/userprofile" onClick={() => setActive(false)}>Profile</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/admin/property" onClick={() => setActive(false)}>Tenders</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/admin/requests" onClick={() => setActive(false)}>Incoming Requests</NavLink>
            </li>
          </>
          :
          <>
            <li className={(isActive) ? "active nav-item": "nav-item"}>
                <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/">Profile<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/property" onClick={() => setActive(false)}>Assigned Tenders</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/requested" onClick={() => setActive(false)}>Applied Tenders</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/exploreAll" onClick={() => setActive(false)}>Explore</NavLink>
            </li>
          </>
      )
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <NavLink to='/'>
                <img src={emblem} alt="emblem" className="emblem"/>
            </NavLink>
            <h3>{props.isAdmin ? "Admin" : ""}</h3>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <RenderMenu/>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar