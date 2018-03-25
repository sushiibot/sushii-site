import React from 'react'
import { DiscordMessages } from '../Discord/discordview'

const messageList = [
  {
    data: {
      content: 'hello',
    },
    username: 'gay boi',
    avatar: 'https://cdn.discordapp.com/avatars/150443906511667200/cb402487ce9cc8cc296662950f3a9099.jpg',
    isBot: false,
  },
  {
    data: {
      content: 'hey!!',
    },
    username: 'sushiiBot',
    avatar: '/static/sushiiAvatar.jpg',
    isBot: true,
  }
]

class DiscordChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { position: 0 }

    this.timer = this.timer.bind(this)
  }

  timer() {
    this.setState({ position: this.state.position + 1 })

    // stop timer if finished
    if (this.state.position >= messageList.length) {
      clearInterval(this.state.interval)
    }
  }

  componentDidMount() {
    let interval = setInterval(this.timer, 1000)
    this.setState({ interval: interval })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <div className='discord-messages-wrapper'>
        <DiscordMessages messages={messageList} position={this.state.position} />
      </div>
    )
  }
}

export default DiscordChat
