import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import HelpMenu from '../components/HelpMenu'
import roleFormat from '../assets/roleFormat.json'
import RolesExample from '../assets/blackpink.json'

const DocsPage = () => (
  <Layout>
    <Helmet title="Help | sushii" />
    <div className='container' style={{ marginTop: '100px' }}>
      <h1 className='title'>
        Help
      </h1>
      <div className='columns'>
        <div className='column is-2'>
          <HelpMenu />
        </div>
        <div className='column'>
          <section className='section'>
            <h3 className='title is-4 is-spaced bd-anchor-title' id='levels'>
              Levels
              <a className='bd-anchor-link' href='#levels'>
                #
              </a>
            </h3>
            <div className='content'>
              <h1>Ranking</h1>
              <p>
                Ranks are split into 4 categories, daily, weekly, monthly, and all time. When you send a message, you gain 5 XP.
                This is limited to at least one minute between each message to prevent spamming.
                Your ranking is calculated by <code>ROW_NUMBER()</code> over each category in which users have sent messages in.
              </p>
              <blockquote className='blockquote'>
                <b>Example:</b> If there has been 30 people who sent a message today, and you have the most XP gained today, you will be 1 / 30 for daily ranking.
              </blockquote>
              <p>
                Ranking is counted on each unique ordinal, iso_week, month, and all time.
                More specifically, the intervals are day of the year (1 - 365/366),
                ISO 8601 week-numbering week of the year (1- 52/53, starting Monday),
                and month within the year (1 - 12).
                Ranks reset in it&apos;s respective category when these values change.
                All times are in UTC.
              </p>
              <h1>Levels</h1>
              <p>
                Levels are calculated with the function <code>XP required = 50 * level.pow(2) - (50 * level)</code>.
                Using the levels command displays the top users in each category.
                The all time category shows each users&apos;s rank while the other periodic categories display the rank change within each timeframe.
              </p>
              <h1>Activity</h1>
              <p>
                Similar to ranking, your activity is updated at a maximum of once per minute.
                When you send a message, a counter is incremented for the respective hour.
                The number displayed on the side of the graph designates the maximum &quot;active minutes&quot; within the 24 hour period.
                These values are never reset and consist of all time activity since the bot joined the server.
                Please allow the bot some time to produce a more accurate result.
              </p>
              <blockquote className='blockquote'>
                <b>Example:</b> If you have sent messages across a total of 200 minutes between 2:00-3:00, your graph will display 200 at that point in time.
              </blockquote>
            </div>
            <h3 className='title is-4 is-spaced bd-anchor-title' id='roles'>
              Roles
              <a className='bd-anchor-link' href='#roles'>
                #
              </a>
            </h3>
            <div className='content'>
              <p>
                Self role assignments can be configured with the following format.
                You can use <a href="https://jsonlint.com/" target="_blank" rel="noopener noreferrer">JSONLint </a>
                to check if your configuration is correct.  Sushii should also respond with errors if your configuration
                is incorrect.
              </p>
              <pre>
                <code>
                  {JSON.stringify(roleFormat, null, 2, 2)}
                </code>
              </pre>
              <p>
                An example is given below.
                The following configuration allows for 2 different categories.
                Bias will allow for a maximum of 3 roles from the category and
                the first role chosen will be the primary ID while following ones
                will be secondary IDs. You can use primary / secondary roles to
                allow for multiple role assignment while keeping a primary one
                in front of others depending on role hierarchy. The extras category
                has no limit on assignments along with no secondary roles IDs.
              </p>
              <pre>
                <code>
                  {JSON.stringify(RolesExample, null, 2, 2)}
                </code>
              </pre>
              <p>
                If you need additional help with the configuration, you can join the
                <a href="https://discord.gg/QCXjyrs" target="_blank" rel="noopener noreferrer"> sushii support Discord server</a>.
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  </Layout>
)

export default DocsPage
