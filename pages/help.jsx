import React from 'react'
import Link from 'next/link'
import Layout from '../layouts/'
import HelpMenu from '../components/HelpMenu'

const DocsPage = () => (
    <Layout>
        <div className="container" style={{marginTop: '100px'}}>
            <h1 className="title">
                Help
            </h1>
            <div className="columns">
                <div className="column is-one-quarter">
                    <HelpMenu />
                </div>
                <div className="column">
                    <section className="section">
                        <h3 className="title is-4 is-spaced bd-anchor-title" id="levels">
                            Levels
                            <a className="bd-anchor-link" href="#levels">
                                #
                            </a>
                        </h3>
                        <div className="content">
                            <h1>Ranking</h1>
                            <p>
                                Ranks are split into 4 categories, daily, weekly, monthly, and all time. When you send a message, you gain 1 XP.  
                                This is limited to at least one minute between each message to prevent spamming. 
                                Your ranking is calculated by <code>ROW_NUMBER()</code> over each category in which users have sent messages in.
                            </p>
                            <blockquote className="blockquote">
                                <b>Example:</b> If there has been 30 people who sent a message today, and you have the most XP gained today, you will be 1 / 30 for daily ranking.
                            </blockquote>
                            <p>
                                Ranking is counted on each unique ordinal, iso_week, month, and all time.  
                                More specifically, the intervals are day of the year (1 - 365/366), 
                                ISO 8601 week-numbering week of the year (1- 52/53, starting Monday), 
                                and month within the year (1 - 12).
                                Ranks reset in it's respective category when these values change.  
                                All times are in UTC.
                            </p>
                            <h1>Levels</h1>
                            <p>
                                Levels are calculated with the function <code>XP required = 50 * level.pow(2) - (50 * level)</code>.
                                Using the levels command displays the top users in each category.  
                                The all time category shows each users's rank while the other periodic categories display the rank change within each timeframe.
                            </p>
                            <h1>Activity</h1>
                            <p>
                                Similar to ranking, your activity is updated at a maximum of once per minute.  
                                When you send a message, a counter is incremented for the respective hour.  
                                The number displayed on the side of the graph designates the maximum "active minutes" within the 24 hour period.
                                These values are never reset and consist of all time activity since the bot joined the server.
                                Please allow the bot some time to produce a more accurate result.
                            </p>
                            <blockquote className="blockquote">
                                <b>Example:</b> If you have sent messages across a total of 200 minutes between 2:00-3:00, your graph will display 200 at that point in time.
                            </blockquote>
                        </div>
                    </section>
                </div>
               
            </div>
        </div>
    </Layout>
)

export default DocsPage
