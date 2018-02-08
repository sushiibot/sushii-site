import React from 'react'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Navbar = () => (
  <nav className="navbar is-fixed-top is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Somi</Link>
        <div className="navbar-burger burger" data-target="navBar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navBar" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="/commands">
              Commands
          </Link>
            <div className="navbar-dropdown is-boxed">
              <Link className="navbar-item" to="/commands#Profile">
                Profile
            </Link>
              <Link className="navbar-item" to="/commands#Notifications">
                Notifications
            </Link>
              <Link className="navbar-item" to="/commands#Meta">
                Meta
            </Link>
              <Link className="navbar-item" to="/commands#Moderation">
                Moderation
            </Link>
              <Link className="navbar-item" to="/commands#Settings">
                Settings
            </Link>
              <Link className="navbar-item" to="/commands#Gallery">
                Gallery
            </Link>
              <Link className="navbar-item" to="/commands#Roles">
                Roles
            </Link>
              <Link className="navbar-item" to="/commands#Reminders">
                Reminders
            </Link>
              <Link className="navbar-item" to="/commands#Tags">
                Tags
            </Link>
              <Link className="navbar-item" to="/commands#Search">
                Search
            </Link>
              <Link className="navbar-item" to="/commands#Userinfo">
                Userinfo
            </Link>
              <Link className="navbar-item" to="/commands#Misc">
                Misc
            </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="/help">
              Help
        </Link>
            <div className="navbar-dropdown is-boxed">
              <Link className="navbar-item" to="/help#Levels">
                Levels
            </Link>
              <Link className="navbar-item" to="/help#Roles">
                Roles
            </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="bd-tw-button is-primary button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000"
                  target="_blank" href="https://www.patreon.com/tzuwy">
                  <span className="icon">
                    <FontAwesomeIcon icon={["fab", "patreon"]} />
                  </span>
                  <span>
                    Patreon
                </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
