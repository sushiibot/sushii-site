import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import fontawesome from '@fortawesome/fontawesome'
import { faPatreon } from '@fortawesome/fontawesome-free-brands'
import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { faChartBar } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faPatreon, faHeart, faChartBar)

import '../styles/index.scss'
import '../styles/style.scss'


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="sushii" />
    <Navbar />
    { children }
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.node,
}


export default TemplateWrapper
