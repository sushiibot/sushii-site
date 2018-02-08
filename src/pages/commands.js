import React from 'react'
import Link from 'gatsby-link'
import DocsMenu from '../components/DocsMenu'

const DocsPage = () => (
    <div>
        <div className="container" style={{ 'margin-top': '100px' }}>
            <h1 className="title">
                Commands
            </h1>
            <div className="columns">
                <div className="column is-one-quarter">
                    <DocsMenu />
                </div>
                <section className="section">
                    <h1>todo 😬</h1>
                    <h3 className="title is-4 is-spaced bd-anchor-title">
                        User
                        <a className="bd-anchor-link" href="#variables">
                            #
                        </a>
                    </h3>
                </section>
            </div>
        </div>
    </div>
)

export default DocsPage
