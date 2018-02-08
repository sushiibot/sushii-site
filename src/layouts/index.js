import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

import './index.scss'
import './style.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="somi Bot"
      meta={[
        { name: 'description', content: 'A discord bot.' },
        { name: 'keywords', content: 'somi, discord, rust' },
      ]}
    />
    <Navbar />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
