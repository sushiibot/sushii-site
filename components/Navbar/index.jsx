import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const NavbarItemLink = withRouter(({ href, name, router, type }) => {
  const NavbarType = type == 'link' ? 'navbar-link' : 'navbar-item'
  const classes = router.pathname === href ? 'is-active ' + NavbarType : NavbarType
  
  return (
    <Link href={href}>
      <a className={classes}>{name}</a>
    </Link>
  )
})

const NavbarLink = (props) => (
  <NavbarItemLink {...props} type='link' />
)

const NavbarItem = (props) => (
  <NavbarItemLink {...props} type='item' />
)

const Navbar = () => (
  <nav className='navbar is-fixed-top is-transparent'>
    <div className='container'>
      <div className='navbar-brand'>
        <Link href='/'>
          <a className='navbar-item'>
            <img src='/static/sushii.png' />
          </a>
        </Link>
        <div className='navbar-burger burger' data-target='navBar'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id='navBar' className='navbar-menu'>
        <NavbarItem href='/about' name='About'/>
        <div className='navbar-start'>
          <div className='navbar-item has-dropdown is-hoverable'>
            <NavbarLink href='/commands' name='Commands' />
            <div className='navbar-dropdown is-boxed'>
              <NavbarItem href='/commands#profile' name='Profile' />
              <NavbarItem href='/commands#notifications' name='Notifications' />
              <NavbarItem href='/commands#meta' name='Meta' />
              <NavbarItem href='/commands#moderation' name='Moderation' />
              <NavbarItem href='/commands#settings' name='Settings' />
              <NavbarItem href='/commands#gallery' name='Gallery' />
              <NavbarItem href='/commands#roles' name='Roles' />
              <NavbarItem href='/commands#reminders' name='Reminders' />
              <NavbarItem href='/commands#tags' name='Tags' />
              <NavbarItem href='/commands#search' name='Search' />
              <NavbarItem href='/commands#userinfo' name='Userinfo' />
              <NavbarItem href='/commands#misc' name='Misc' />
            </div>
          </div>
          <div className='navbar-item has-dropdown is-hoverable'>
            <NavbarLink href='/help' name='Help' />
            <div className='navbar-dropdown is-boxed'>
              <NavbarItem href='/help#levels' name='Levels' />
              <NavbarItem href='/help#roles' name='Roles' />
            </div>
          </div>
          <NavbarItem href='/patrons' name='Patrons' />
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='field is-grouped'>
              <p className='control'>
                <a className='is-primary button' target='_blank' rel='noopener noreferrer' href='https://www.patreon.com/tzuwy'>
                  <span className='icon'>
                    <FontAwesomeIcon icon={['fab', 'patreon']} />
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
