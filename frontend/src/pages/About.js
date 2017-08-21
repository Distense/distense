import React from 'react'

import Layout from '../components/Layout'
import Head from '../components/common/Head'

export default () => (
  <Layout>
    <Head title='About'/>
    <div className="">

      <p className='hero-header-about'>
        Distense is a decentralized, for-profit code cooperative.
      </p>
      <h2>Anyone, anywhere can join and contribute anonymously</h2>

      <p>
        Distense is unlike most companies in that there are no executives, shareholders or board of directors. Decisions are made by past
        contributors to Distense.
        Ethereum smart contracts execute the decisions that are voted on by contributors. Nearly everything can be voted on.
      </p>
      <p>
        Contributors receive a token called DID which they can choose to keep and participate in Distense or they can exchange and sell their DID at
        any time.
        Only past contributors to Distense can vote on governance matters votes are tallied securely on the Ethereum blockchain.
        Votes are determined according to the number of DID each contributor holds.
      </p>

      <h2 className='header-about'>
        How Can I Get Started?
      </h2>
      <p>
        Anyone, anywhere can join Distense and start contributing. While Distense is not currently running on the Ethereum mainnet,
        tasks and work <em>are</em> being tracked and <em>will</em> be rewarded upon launch.
      </p>

      <p>The best way to join Distense is to&nbsp;
        <a href='mailto:team@disten.se?Subject=Contributing to Distense' target='_top'>email our team</a>
         , and we'll get you setup.
      </p>

      <h2 className='header-about'>
        How is Distense Different?
      </h2>
      <img className='distense-versus-industrial-img' alt='How Distense is Different' src='../public/distense-versus-industrial.png'/>

      <h2 className='header-about'>
        How does Distense Work?
      </h2>
      <ul className='how-it-works'>
        <li>Anyone visits our site</li>
        <li>They view the list of available tasks</li>
        {/*TODO link*/}
        <li>They read the detailed spec of a task</li>
        <li>
          They pick a task with skills they have (e.g. website development or <span className='code-highlighting-general'>web3.js</span>
          )
        </li>
        <li>The user authenticates themselves with an Ethereum account using Metamask, Mist or another Ethereum browser</li>
        <li>They begin work on the task</li>
        <li>When complete, they submit their work to be reviewed by past contributors to Distense</li>
        <li>They are rewarded with DID</li>
        <li>They optionally exchange their DID for HAV and receive cash</li>
      </ul>

      <h2 className='header-about'>
        How does Distense Sustain Itself?
      </h2>
      <p>
        Distense sustains itself by exposing the blockchain and remote work applications we build for our internal operations to third-parties. Many
        of these applications involve transferring ether in some way, so we charge a small fee on top of the amounts users send.
      </p>


      <section id='why' className='container-info'>
        <div className='below-fold-content'>
          <h2 className='content-center'>
            Modern work is <strong>Broken</strong>
          </h2>
          <div className='grid-flex-container'>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <img src='../public/michael-wolf-tokyo-compression.jpg' alt='Michael Wolf Tokyo Compression'/>
              </div>
              <h5 className='content-center'>
                <strong>
                  Modern work sucks
                </strong>
              </h5>
              <p>Modern work has a number of problems:</p>
              <ul>
                <li>Work is stressful</li>
                <li>Commuting is inefficient and time consuming</li>
                <li>Many tasks are menial</li>
              </ul>
              <p>
                Distense increases the aggregate amount of digital work available by reducing the size of tasks.
                This increases the number of people who can complete the work.
              </p>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/unemployed-woman-hire-me.jpeg' alt='Unemployed woman saying hire me'/>
                </div>
              </div>
              <h5 className='content-center'><strong>
                Being unemployed is miserable
              </strong>
              </h5>
              <a href="http://archive.is/mW49e">200 million people are unemployed worldwide</a>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/michael-wolf-tokyo-compression.jpg' alt='Michael Wolf Tokyo Compression'/>
                </div>
              </div>
              <h5 className='content-center'><strong>Commuting sucks</strong></h5>
              <p>Those of us who wish to work better but shorter, or in different locales can't do so.</p>
              <p>
                The Internet has been one of the great equalizers in human history and a real accelerator of innovation.
                But the increasing consolidation of control is a threat to that.
              </p>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/michael-wolf-tokyo-compression.jpg' alt='Michael Wolf Tokyo Compression'/>
                </div>
              </div>
              <h5 className='content-center'><strong>Centralized corporations fail</strong></h5>
              <p>Modern society is structured around large, centralized corporations who have a host of problems:</p>
              <ul className="unstyled-list">
                <li>Biases & harassment</li>
                <li>Bankruptcies</li>
                <li>Fraud</li>
                <li>Conflicts of interest</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='how' className='container-info'>
        <div className='below-fold-content'>
          <h2 className='content-center'>
            How Distense <strong>Solves</strong> These Problems
          </h2>
          <div className='grid-flex-container'>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <img src='../public/laptop-table-beach.png' alt='Laptop on Beach Picture'/>
              </div>
              <h5 className='content-center'><strong>Work from anywhere</strong></h5>
              <p>
                Because Distense has no offices and all work is digital,
                contributors can work from anywhere,
                any time, and for as long as they wish.
              </p>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/laptop-table-beach.png' alt='Laptop on Beach Picture'/>
                </div>
              </div>
              <h5 className='content-center'>
                <strong>
                  Work on exactly what you want
                </strong>
              </h5>
              <p>
                Distense rewards contributors on a per task basis which makes working on
                specifically what you enjoy and await have skills for possible.
              </p>
              <p>
                Work on exactly what you want:
              </p>
              <ul className='unstyled-list'>
                <li>React Frontend</li>
                <li>Design</li>
                <li>Solidity Contracts</li>
                <li>Build Ethereum applications</li>
              </ul>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/michael-wolf-tokyo-compression.jpg' alt='Michael Wolf Tokyo Compression'/>
                </div>
              </div>
              <h5 className='content-center'>
                <strong>
                  Anonymity makes many work issues impossible
                </strong>
              </h5>
            </div>
            <div className='grid-flex-cell'>
              <div className='illustration'>
                <div className='illustration'>
                  <img src='../public/michael-wolf-tokyo-compression.jpg' alt='Michael Wolf Tokyo Compression'/>
                </div>
              </div>
              <h5 className='content-center'><strong>Choose cash or equity</strong></h5>
              <p>
                Distense's primary form of compensation is the DID token.
                Choose whether to keep or sell your DID for cash in the exact ratio you desire
              </p>
              <p>
                Distense contributors are automatically credited with DID upon successful completion of a task.
                You can choose to keep your DID and participate in future governance of Distense to a greater degree
                or you may convert DID and sell your DID and receive cash.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    { /*language=CSS*/ }
    <style jsx>{`

      /*BEGIN -- BELOW THE FOLD*/
      @media screen and (min-width: 900px) {
        h2 {
          font-size: 36px;
        }
      }

      h2 {
        margin-bottom: 20px;
        line-height: 1.25;
      }

      h5.content-center strong {
        font: normal 600 18px Quicksand;
        color: #083b54;
        margin-bottom: 12px;
      }

      .container-info {
        width: 90%;
        margin: 0 auto;
        padding-top: 60px;
      }

      .grid-flex-container {
        margin: 0 0 30px -30px;
        padding: 15px 5px;
        list-style: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
      }

      .grid-flex-cell {
        margin-top: 25px;
        padding: 10px;
        width: 45%;
        flex-grow: 1;
      }

      @media screen and (min-width: 601px) {
        .grid-flex-cell {
          flex: none;
        }
      }

      .illustration img {
        height: 230px;
        margin: 0 auto;
        max-width: 90%;
        max-height: 90%;
        border-radius: 5px;
      }

      .unstyled-list li {
        list-style-type: circle;
      }

      .content-center {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }

      /*END -- BELOW THE FOLD*/
      ul.how-it-works {
        list-style-type: circle;
      }

      .italicized {
        font-style: italic;
      / / TODO globalify
      }

      h2.header-about {
        margin: 30px 0 -5px 0;
      }

      .hero-header-about {
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 5px 0;
      }

      .distense-versus-industrial-img {
        margin-left: auto;
        margin-right: auto;
        width: 800px;
        height: 800px;
        margin-top: 30px;
      }

      .code-highlighting-general {
        background-color: lightgray;
        color: red;
        padding: 1px 3px;
        border-radius: 3.5px;
        /*TODO globalify*/
      }
    `}</style>
  </Layout>
)