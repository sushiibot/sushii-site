import React from 'react'
import PropTypes from 'prop-types'
import commands from '../../assets/commands'
import DiscordView from '../Discord/discordview'

import '../../styles/discord.scss'

export const CommandMenu = () => (
  <aside className='menu' style={{position: 'sticky', top: '100px'}}>
    <ul className='menu-list'>
      {
        Object.keys(commands).map((category, i) => {
          return <CommandMenuItem name={category} key={i}/>
        })
      }
    </ul>
  </aside>
)

class CommandMenuItem extends React.Component {
  static propTypes = {
    name: PropTypes.object.isRequired
  }

  render() {
    return (
      <li>
        <a href={'#' + this.props.name.toLowerCase()}>
          { this.props.name }
        </a>
      </li>
    )
  }
}

export class CommandCategory extends React.Component {
  static propTypes = {
    name: PropTypes.object.isRequired
  }

  render() {
    return (
      <h3 className='title is-4 is-spaced bd-anchor-title'>
        {this.props.name}
        <span className='bd-anchor-target' id={this.props.name.toLowerCase()}></span>
        <a className='bd-anchor-link' href={'#' + this.props.name.toLowerCase()}>
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
    // required permissions
    let permissions = ''
    if (this.props.data.permissions &&
      this.props.data.optional) {
      permissions = <span className="tag is-warning">
        {this.props.data.permissions}
      </span>
    } else if (
      this.props.data.permissions &&
      !this.props.data.optional
    ) {
      permissions = <span className="tag is-danger">
        {this.props.data.permissions}
      </span>
    }

    // command aliases
    let aliases = ''
    if (this.props.data.aliases) {
      aliases = <div>
        <span className="has-text-grey">
          Aliases: {this.props.data.aliases.join(', ')}
        </span> <br />
      </div>
    }

    // command usage
    let usage = ''
    if (this.props.data.usage) {
      usage = this.props.data.usage
    }

    let example = ''
    if (this.props.data.example) {
      example = <div>
        <DiscordView
          messages={this.props.data.example}
          username='Someone'
          botUsername='sushii'
          botAvatarUrl='https://cdn.discordapp.com/avatars/193163974471188480/61d7b9154888291be207b29a57bc8c9d.jpg' />
      </div>
      
    }

    return (
      <div style={{marginBottom: '30px'}}>
        <div>
          <span className="has-text-weight-bold">
            {this.props.data.name}  
          </span>  {permissions}
        </div>
        <p>{this.props.data.desc}
          <br />
          {aliases}
          Usage: <code>{this.props.data.name + ' ' + usage}</code>
        </p>
        {example && 'Example:'}
        {example ? example : ''}
      </div>
    )
  }
}
