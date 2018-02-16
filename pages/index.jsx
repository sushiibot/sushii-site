import React from 'react'
import Link from 'next/link'
import Layout from '../layouts/'

const IndexPage = () => (
  <Layout>
    <div>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              sushii
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
                    Just like the bot, this site is also really incomplete and in progress.
                    <br /> If you have any suggestions feel free to message me on discord. :]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default IndexPage
