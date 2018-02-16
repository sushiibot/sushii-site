import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

import './index.scss'

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
    <Menu />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
