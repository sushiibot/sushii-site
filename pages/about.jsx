import React from 'react'
import Layout from '../layouts/'
import Helmet from 'react-helmet'

const AboutPage = () => (
  <Layout>
    <Helmet title="About | sushii" />
    <div className='container' style={{ marginTop: '100px' }}>
      <h1 className='title'>
        About
      </h1>
      <div className='content'>
        <p>sushii is written in <a href='https://www.rust-lang.org/' target='_blank' rel='noopener noreferrer'>Rust</a> with <a href='https://github.com/zeyla/serenity/' target='_blank' rel='noopener noreferrer'>serenity-rs</a> and <a href='https://www.postgresql.org/' target='_blank' rel='noopener noreferrer'>PostgreSQL</a>.</p>
        <p>This site is made with <a href='https://github.com/koajs/koa' target='_blank' rel='noopener noreferrer'>Koa</a>, <a href='https://github.com/zeit/next.js/' target='_blank' rel='noopener noreferrer'>Next.js</a>, <a href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>React</a>, and <a href='https://bulma.io' target='_blank' rel='noopener noreferrer'>Bulma</a>.</p>
      </div>
    </div>
  </Layout>
)

export default AboutPage
