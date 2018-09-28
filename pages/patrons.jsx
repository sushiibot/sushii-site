import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const PatronPage = () => (
  <Layout>
    <Helmet title="Patrons | sushii" />
    <section className='hero is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title is-1'>
            Patrons
          </h1>
          <p style={{ margin: '20px 0 40px' }}>
            Want to be on this list?
            Support me on <a href='https://www.patreon.com/sushiibot' target='_blank' rel='noopener noreferrer'>Patreon</a>!
            <br />
            The funds will go towards hosting and improvements.
          </p>
          <div className='columns'>
            <div className='column'>
              <p className='has-text-weight-bold'>$10</p>
              <p className='is-size-5'>Mithy</p>
              <span className='icon has-text-danger'>
                <FontAwesomeIcon icon={['far', 'heart']} />
              </span>
            </div>
            <div className='column'>
              <p className='has-text-weight-bold'>$5</p>
              <p className='is-size-5'>Merjpu</p>
              <p className='is-size-5'>Joshy</p>
              <p className='is-size-5'>Doot</p>
              <span className='icon has-text-danger'>
                <FontAwesomeIcon icon={['far', 'heart']} />
              </span>
            </div>
            <div className='column'>
              <p className='has-text-weight-bold'>$1</p>
              <p className='is-size-5'>Jer</p>
              <p className='is-size-5'>Rave</p>
              <p className='is-size-5'>Code</p>
              <p className='is-size-5'>Kaze</p>
              <p className='is-size-5'>Jinnie</p>
              <p className='is-size-5'>Sekl</p>
              <span className='icon has-text-danger'>
                <FontAwesomeIcon icon={['far', 'heart']} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default PatronPage
