import React from 'react'
import PropTypes from 'prop-types'
import commands from '../../assets/commands'
import DiscordView from '../Discord/discordview'

import '../../styles/discord.scss'

export class CommandMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positions: {}
    }
  }

  componentDidMount() {
    Object.keys(commands).forEach(category => {
      const id = category.toLowerCase().replace(' ', '_')
      const element = document.getElementById(id)
      const top = element.getBoundingClientRect().top + window.pageYOffset
      const newState = this.state.positions
      newState[top] = id

      this.setState(() => ({
        positions: newState
      }))
    })

    document.addEventListener('scroll', () => {
      this.setActiveCommand()
    })

    this.setActiveCommand()
  }

  setActiveCommand() {
    this.setState(() => ({
      activeId: this.getActiveCommand()
    }))
  }

  getActiveCommand() {
    const { positions } = this.state

    let max
    Object.keys(positions).forEach(pos => {
      if (window.pageYOffset > pos - 15) {
        max = pos
      }
    })

    return positions[max]
  }

  render() {
    return (
      <aside className='menu' style={{ position: 'sticky', top: '100px' }}>
        <ul className='menu-list'>
          {
            Object.keys(commands).map((category, i) => {
              return <CommandMenuItem name={category} key={i} activeId={this.state.activeId}/>
            })
          }
        </ul>
      </aside>
    )
  }
} 

class CommandMenuItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    activeId: PropTypes.string,
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect()
    const html = document.documentElement
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    )
  }

  render() {
    const id = this.props.name.toLowerCase().replace(' ', '_')
    const isActive = this.props.activeId == id

    return (
      <li>
        <a href={'#' + id} className={isActive ? 'menu-is-active' : ''}>
          { this.props.name }
        </a>
      </li>
    )
  }
}

export class CommandCategory extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const { name } = this.props
    const id = name.toLowerCase().replace(' ', '_')

    return (
      <h3 className='title is-4 is-spaced bd-anchor-title'>
        {name}
        <span className='bd-anchor-target' id={id}></span>
        <a className='bd-anchor-link' href={'#' + id}>
          #
        </a>
      </h3>
    )
  }
}

export class CommandItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { data } = this.props

    // required permissions
    let permissions = ''
    if (data.permissions && data.optional) {
      permissions = <span className="tag is-warning">
        {data.permissions}
      </span>
    } else if (data.permissions && !data.optional) {
      permissions = <span className="tag is-danger">
        {data.permissions}
      </span>
    }

    // command aliases
    let aliases = ''
    if (data.aliases) {
      aliases = <span>
        <span className="has-text-grey">
          Aliases: {data.aliases.join(', ')}
        </span> <br />
      </span>
    }

    // command usage
    let usage = ''
    if (data.usage) {
      usage = data.usage
    }

    // use given username / avatar or fallback to random values
    const username = data.example ? data.example.command.username : null
    const avatar = data.example ? data.example.command.avatar : null

    const usernames = ['Someone', 'nobody', 'you']
    const fallbackUsername = usernames[Math.floor(Math.random() * usernames.length)]

    let example = ''
    if (data.example) {
      example = <div>
        <DiscordView
          messages={data.example}
          username={username ? username : fallbackUsername}
          avatar={avatar}
          botUsername='sushii'
          botAvatarUrl='https://cdn.discordapp.com/avatars/193163974471188480/61d7b9154888291be207b29a57bc8c9d.jpg' />
      </div>
      
    }

    const anchor_id = data.name.toLowerCase().replace(' ', '_')

    return (
      <div className='command-item' style={{marginBottom: '30px'}}>
        <span className='bd-anchor-target' id={'cmd_' + anchor_id}/>
        <a className='command-name has-text-weight-bold' href={'#cmd_' + anchor_id}>
          {data.name}
        </a>  {permissions}
        <div className='command-content'>
          <p>{data.desc}
            <br />
            {aliases}
            Usage: <code>{data.name + ' ' + usage}</code>
          </p>
          {example && 'Example:'}
          {example ? example : ''}
        </div>
      </div>
    )
  }
}
