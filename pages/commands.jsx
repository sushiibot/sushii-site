import React from 'react'
import Layout from '../layouts/'
import commands from '../assets/commands'
import { CommandMenu, CommandCategory, CommandItem } from '../components/Commands'

const DocsPage = () => (
  <Layout>
    <div className='container' style={{ marginTop: '100px' }}>
      <h1 className='title'>
        Commands
      </h1>
      <div className='columns'>
        <div className='column is-one-quarter'>
          <CommandMenu />
        </div>
        <section className='section'>
          <article className="message is-info">
            <div className="message-body">
              Required arguments use <code>[brackets]</code>
              <br />
              Optional arguments use <code>(parentheses)</code>
              <br/>
              Some commands have a <span className="tag is-danger">
                REQUIRED_PERMISSION
              </span> or <span className="tag is-warning">
                OPTIONAL_PERMISSION
              </span> for additional functionality.
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
