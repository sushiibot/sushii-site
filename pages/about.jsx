import React from 'react'
import Link from 'next/link'
import Layout from '../layouts/'

const AboutPage = () => (
    <Layout>
        <div className="container" style={{ marginTop: '100px' }}>
            <h1 className="title">
                About
            </h1>
            <div className="content">
                <p>sushii is written in <a href="https://www.rust-lang.org/" target="_blank">Rust</a> with <a href="https://github.com/zeyla/serenity/" target="_blank">serenity-rs</a>.</p>
                <p>This site was made with <a href="https://www.gatsbyjs.org/" target="_blank">GatsbyJS</a> and <a href="https://bulma.io" target="_blank">Bulma</a>.</p>
            </div>
        </div>
    </Layout>
)

export default AboutPage
