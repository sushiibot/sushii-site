import React from 'react'
import Link from 'next/link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Navbar = () => (
  <nav className="navbar is-fixed-top is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">sushii</a>
        </Link>
        <div className="navbar-burger burger" data-target="navBar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navBar" className="navbar-menu">
        <Link href="/about">
          <a className="navbar-item">About</a>
        </Link>
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link href="/commands">
              <a className="navbar-link">Commands</a>
            </Link>
            <div className="navbar-dropdown is-boxed">
              <Link href="/commands#profile">
                <a className="navbar-item">Profile</a>
            </Link>
              <Link href="/commands#notifications">
                <a className="navbar-item">Notifications</a>
            </Link>
              <Link href="/commands#meta">
                <a className="navbar-item">Meta</a>
            </Link>
              <Link href="/commands#moderation">
                <a className="navbar-item">Moderation</a>
            </Link>
              <Link href="/commands#settings">
                <a className="navbar-item">Settings</a>
            </Link>
              <Link href="/commands#gallery">
                <a className="navbar-item">Gallery</a>
            </Link>
              <Link href="/commands#roles">
                <a className="navbar-item">Roles</a>
            </Link>
              <Link href="/commands#reminders">
                <a className="navbar-item">Reminders</a>
            </Link>
              <Link href="/commands#tags">
                <a className="navbar-item">Tags</a>
            </Link>
              <Link href="/commands#search">
                <a className="navbar-item">Search</a>
            </Link>
              <Link href="/commands#userinfo">
                <a className="navbar-item">Userinfo</a>
            </Link>
              <Link href="/commands#misc">
                <a className="navbar-item">Misc</a>
            </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link href="/help">
              <a className="navbar-link">Help</a>
            </Link>
            <div className="navbar-dropdown is-boxed">
              <Link href="/help#levels">
                <a className="navbar-item">Levels</a>
              </Link>
                <Link href="/help#roles">
                  <a className="navbar-item">Roles</a>
              </Link>
            </div>
          </div>
          <Link href="/patrons">
            <a className="navbar-item">Patrons</a>
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
