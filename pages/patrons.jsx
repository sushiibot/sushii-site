import React from 'react'
import Layout from '../layouts/'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const PatronPage = () => (
  <Layout>
    <section className='hero is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-one-third has-text-centered'>
              <h1 className='title'>
                Patrons
              </h1>
              <ul>
                <b>$10</b>
                <li>Mithy</li>
                <br />
                <b>$5</b>
                <li>Merjpu</li>
                <li>Joshy</li>
                <br />
                <b>$1</b>
                <li>Jer</li>
                <li>Rave</li>
                <li>Code</li>
                <li>Kaze</li>
                <li>Jinnie</li>
              </ul>
              <span className='icon has-text-danger'>
                <FontAwesomeIcon icon={['far', 'heart']} />
              </span>
              <p style={{marginTop: '20px'}}>
                Want to be on this list?
                Support me on <a href='https://www.patreon.com/tzuwy' target='_blank' rel='noopener noreferrer'>Patreon</a>!
                <br/>
                The funds will go towards hosting and improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default PatronPage
