import React from 'react'
import Layout from '../layouts/'
import withData from '../lib/withData'
import Stats from '../components/Stats'

export default withData(() => (
  <Layout>
    <div>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <img src='/static/sushii.png' />
            <h1 className='title'>
              sushii
            </h1>
            <p className='subtitle'>
              A <a href='https://discordapp.com' target='_blank' rel='noopener noreferrer'>Discord</a> bot.
            </p>
            <a className='button is-link' target='_blank' rel='noopener noreferrer' href='/invite'>
              Add me to Discord!
            </a>
            <br/><br/><br/>
            <div className='columns is-centered'>
              <div className='column is-narrow'>
                <div className='bd-notification is-info'>
                  <div className='notification'>
                    <b>Note:</b> This is currently an <b>in development</b> bot and will not be the same as the stable release.
                    <br /> By adding this bot you understand it may have features may be added, removed, changed, or break at any given moment.
                    <br /> There are intermittent bugs and deadlocks that may occur.  Uptime is <b>not guaranteed</b>.
                    <br /> <br />
                    Just like the bot, this site is also really incomplete and in progress.
                    <br /> If you have any suggestions feel free to message me on discord. :]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hero-foot'>
          <nav className='level' style={{ paddingBottom: '50px' }}>
            <Stats />
          </nav>
        </div>
      </section>
    </div>
  </Layout>
))
