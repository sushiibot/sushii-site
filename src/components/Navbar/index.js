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
              <Link className="navbar-item" to="/commands#profile">
                Profile
            </Link>
              <Link className="navbar-item" to="/commands#notifications">
                Notifications
            </Link>
              <Link className="navbar-item" to="/commands#meta">
                Meta
            </Link>
              <Link className="navbar-item" to="/commands#moderation">
                Moderation
            </Link>
              <Link className="navbar-item" to="/commands#settings">
                Settings
            </Link>
              <Link className="navbar-item" to="/commands#gallery">
                Gallery
            </Link>
              <Link className="navbar-item" to="/commands#roles">
                Roles
            </Link>
              <Link className="navbar-item" to="/commands#reminders">
                Reminders
            </Link>
              <Link className="navbar-item" to="/commands#tags">
                Tags
            </Link>
              <Link className="navbar-item" to="/commands#search">
                Search
            </Link>
              <Link className="navbar-item" to="/commands#userinfo">
                Userinfo
            </Link>
              <Link className="navbar-item" to="/commands#misc">
                Misc
            </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="/help">
              Help
            </Link>
            <div className="navbar-dropdown is-boxed">
              <Link className="navbar-item" to="/help#levels">
                Levels
              </Link>
                <Link className="navbar-item" to="/help#roles">
                  Roles
              </Link>
            </div>
          </div>
          <Link className="navbar-item" to="/patrons">
            Patrons
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="is-primary button" target="_blank" href="https://www.patreon.com/tzuwy">
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
