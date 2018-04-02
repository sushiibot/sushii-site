import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Link from 'next/link'
import { withRouter } from 'next/router'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import commands from '../../assets/commands'
import NProgress from 'nprogress'

import '../../styles/nprogress.scss'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

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

class NavBarBurger extends React.Component {
  static propTypes = {
    hamburgerIsActive: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
  }

  render() {
    let classes = 'navbar-burger burger'

    if (this.props.hamburgerIsActive) {
      classes += ' is-active'
    }

    return (
      <div onClick={this.props.handleClick} className={classes} data-target='navBar'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
}

const NavBarInvite = withRouter(({router}) => {
  const isVisible = router.pathname.length > 1
  let style = {}

  if (!isVisible) {
    style = { display: 'none' }
  }

  return (
    <p className="control">
      <a className='button is-link' target='_blank' rel='noopener noreferrer' href='/invite' style={style}>
        Add to Discord
      </a>
    </p>
  )
})

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hamburgerIsActive: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      hamburgerIsActive: !prevState.hamburgerIsActive
    }))
  }

  render() {
    let navBarClasses = 'navbar-menu'

    if (this.state.hamburgerIsActive) {
      navBarClasses += ' is-active'
    }

    return (
      <nav className='navbar is-fixed-top is-transparent'>
        <div className='container'>
          <div className='navbar-brand'>
            <Link href='/'>
              <a className='navbar-item'>
                <img src='/static/sushii.png' />
              </a>
            </Link>
            <NavBarBurger handleClick={this.handleClick} hamburgerIsActive={this.state.hamburgerIsActive}/>
          </div>

          <div id='navBar' className={navBarClasses}>
            <NavbarItem href='/about' name='About' />
            <NavbarItem href='/leaderboard' name='Leaderboard' />
            <div className='navbar-start'>
              <div className='navbar-item has-dropdown is-hoverable'>
                <NavbarLink href='/commands' name='Commands' />
                <div className='navbar-dropdown is-boxed'>
                  {
                    Object.keys(commands).map((category, i) => {
                      return <NavbarItem href={'/commands#' + category.toLowerCase().replace(' ', '_')} name={category} key={i} />
                    })
                  }
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
                  <NavBarInvite />
                  <p className='control'>
                    <a className='is-danger button' target='_blank' rel='noopener noreferrer' href='https://www.patreon.com/sushiibot'>
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
  }
}

export default Navbar
