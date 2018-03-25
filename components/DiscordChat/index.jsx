import React from 'react'
import { DiscordMessages } from '../Discord/discordview'

const users = {
  invoker: {
    username: 'Joshy',
    avatar: 'https://cdn.discordapp.com/avatars/170366273354596352/a_141c9dbcafcfa98a2d2d4ad310c322a9.jpg',
    isBot: false,
  },
  bot: {
    username: 'sushii',
    avatar: '/static/sushiiAvatar.jpg',
    isBot: true,
  }
}

const messageList = [
  {
    command: {
      content: 'hi',
    },
    response: {
      content: 'hi',
    },
  },
  {
    command: {
      content: '-profile',
    },
    response: {
      image: '/static/level.png',
    },
  },
  {
    command: {
      content: '-fm',
    },
    response: {
      embed: {
        author: {
          name: 'Joshy - Now Playing',
          icon_url: '/static/lfm.jpg',
        },
        color: 0xb90000,
        thumbnail: {
          url: '/static/rv.png',
        },
        fields: [
          {
            name: 'Artist - Song',
            value: 'Red Velvet - [Bad Boy](https://www.last.fm/music/Red+Velvet/_/Bad+Boy)',
          },
          {
            name: 'Album',
            value: 'The Perfect Red Velvet - The 2nd Album Repackage'
          }
        ],
        footer: {
          text: 'Total Tracks: 63287',
        },
        timestamp: '2018-03-03T05:06:33.246Z',
      }
    }
  }
]

class DiscordChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0,
      messages: [],
    }

    this.timer = this.timer.bind(this)
    this.buildCommand = this.buildCommand.bind(this)
  }

  typeCommand(cmd) {
    return new Promise((resolve) => {
      let pos = 0
      let typed = ''

      let typingInterval = setInterval(() => {
        pos++
        typed = cmd.substring(0, pos)

        this.setState({ input: typed })

        if (pos > cmd.length) {
          clearInterval(typingInterval)
          this.setState({ input: '' })
          resolve()
        }
      }, 100)
    })
  }

  async buildCommand() {
    console.log(this.state.position)
    let newMsg = {
      data: messageList[this.state.position]['command'],
      ...users['invoker'],
    }

    let response = {
      data: messageList[this.state.position]['response'],
      ...users['bot'],
    }

    await this.typeCommand(newMsg.data.content)
    this.addMessage(newMsg)
    setTimeout(() => this.addMessage(response), 150)
  }

  addMessage(msg) {
    let newMessages = [...this.state.messages, msg]
    this.setState({ messages: newMessages })
  }

  timer() {
    this.buildCommand()
    // increment counter
    this.setState({ position: this.state.position + 1 })

    // stop timer if finished
    if (this.state.position >= messageList.length) {
      clearInterval(this.state.interval)
    }
  }

  componentDidMount() {
    // run first message immediately
    this.timer()
    
    let interval = setInterval(this.timer, 3000)
    this.setState({ interval: interval })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <div className='discord-messages-wrapper'>
        <DiscordMessages messages={ this.state.messages } input={ this.state.input } />
      </div>
    )
  }
}

export default DiscordChat
