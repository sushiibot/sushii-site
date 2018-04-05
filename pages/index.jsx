import React from 'react'
import Link from 'next/link'
import Layout from '../layouts/'
import DiscordChat from '../components/DiscordChat'
import withData from '../lib/withData'
import Stats from '../components/Stats'

// Discord css
import '../styles/discord.scss'

export default withData(() => (
  <Layout>
    <div>
      <section className='hero is-fullheight intro-hero'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns'>
              <div className='column intro-column'>
                <div className='intro-content'>
                  <img src='/static/sushii.png' style={{ display: 'none' }} />
                  <h1 className='title is-1'>
                    sushii <span className="tag is-danger">Beta</span>
                  </h1>
                  <h4 className='subtitle is-4'>
                    A multi-purpose bot for <a href='https://discordapp.com' target='_blank' rel='noopener noreferrer'>Discord</a>.
                  </h4>
                  <a className='button is-link' target='_blank' rel='noopener noreferrer' href='/invite' style={{ marginRight: '10px', marginTop: '5px' }}>
                    Add to Discord
                  </a>
                  <Link href='/commands'>
                    <a className='button' style={{ marginTop: '5px' }}>View Commands</a>
                  </Link>
                </div>
              </div>
              <div className='column'>
                <DiscordChat />
              </div>
            </div>
          </div>
        </div>
        <div className='hero-foot'>
          <div className='container'>
            <nav className='level' style={{ paddingBottom: '50px' }}>
              <Stats />
            </nav>
          </div>
        </div>
      </section>
    </div>
  </Layout>
))
