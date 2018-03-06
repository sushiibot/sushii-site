import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import commands from '../assets/commands'
import { CommandMenu, CommandCategory, CommandItem } from '../components/Commands'

const DocsPage = () => (
  <Layout>
    <Helmet title="Commands | sushii" />
    <div className='container' style={{ marginTop: '100px' }}>
      <h1 className='title'>
        Commands
      </h1>
      <div className='columns'>
        <div className='column is-2'>
          <CommandMenu />
        </div>
        <section className='section'>
          <article className="message">
            <div className="message-body">
              The default prefix for sushii is <code>-</code> You can also @mention the bot for the prefix.
              <br/>
              Required arguments are in <code>[brackets]</code>
              <br />
              Optional arguments are in <code>(parentheses)</code>
              <br/>
              Some commands have a <span className="tag is-danger">
                REQUIRED_PERMISSION
              </span> or <span className="tag is-warning">
                OPTIONAL_PERMISSION
              </span> for the user invoking the command to use additional functionality.
            </div>
          </article>
          {
            Object.keys(commands).map(category => {
              return (
                <div key={category}>
                  <CommandCategory name={category} />
                  {
                    commands[category].map((element, i) => {
                      return (
                        <div key={i}>
                          <CommandItem data={element} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </section>
      </div>
    </div>
  </Layout>
)

export default DocsPage
