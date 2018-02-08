import React from 'react'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const PatronPage = () => (
  <div>
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Patrons
          </h1>
          <ul>
            <li>Mithy</li>
            <li>Merjpu</li>
            <li>Joshy</li>
          </ul>
          <span className="icon has-text-danger">
            <FontAwesomeIcon icon={["far", "heart"]} />
          </span>
        </div>
      </div>
    </section>
  </div>
)

export default PatronPage
