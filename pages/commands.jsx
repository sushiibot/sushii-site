import React from 'react'
import Layout from '../layouts/'
import DocsMenu from '../components/DocsMenu'

const DocsPage = () => (
  <Layout>
    <div className='container' style={{ marginTop: '100px' }}>
      <h1 className='title'>
        Commands
      </h1>
      <div className='columns'>
        <div className='column is-one-quarter'>
          <DocsMenu />
        </div>
        <section className='section'>
          <h1>todo 😬</h1>
          <h3 className='title is-4 is-spaced bd-anchor-title'>
            User
            <a className='bd-anchor-link' href='#user'>
              #
            </a>
          </h3>
        </section>
      </div>
    </div>
  </Layout>
)

export default DocsPage
