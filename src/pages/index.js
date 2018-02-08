import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            somi Bot
          </h1>
          <p className="subtitle">
            a work in progress, written in <a href="https://www.rust-lang.org/" target="_blank">Rust</a>.
          </p>
          <a className="button is-link" target="_blank" href="https://discordapp.com/oauth2/authorize?&client_id=193163942502072320&scope=bot">
            Add to Discord
          </a>
          <br/><br/><br/>
          <div className="columns is-mobile is-centered">
            <div className="column is-narrow">
              <div className="bd-notification is-info">
                <div className="notification">
                  <b>Note:</b> This is currently an <b>in development</b> bot and will not be the same as the stable release.
                  <br /> By adding this bot you understand it may have features may be added, removed, changed, or break at any given moment.
                  <br /> There are intermittent bugs and deadlocks that may occur.
                  <br /> <br />
                  This site is also really incomplete, so uhhh yeah
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default IndexPage
