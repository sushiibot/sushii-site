import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import fontawesome from '@fortawesome/fontawesome'
import { faPatreon } from '@fortawesome/fontawesome-free-brands'
import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { faChartBar } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faPatreon, faHeart, faChartBar)

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
