import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';

class Layout extends Component {
  static propTypes = {
    title: PropTypes.string
  };
  constructor() {
    super();

    this.state = {
      aboutText: 'About',
      production: process.env.NODE_ENV === 'production' // eslint-disable-line
    };
    this.loading = this.loading.bind(this);
  }

  /**
   * when you click on the about link it will change the text in it and when it finish fetching
   * the /about route data from the api it will transition to the /about page
   */
  loading() {
    if (Router.pathname !== '/about') {
      this.setState({
        aboutText: `
          Fetching about data before rendering page, this might take a while if <i>now</i> server
          was asleep...
        `
      });
      Router.push('/about');
    }
  }
  render() {
    const { title, children } = this.props;
    const { aboutText, production } = this.state;
    console.log('production? ', production);
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {
            production &&
            <link rel="stylesheet" href="/static/css/app.css" />
          }
        </Head>
        <header>
          <nav>
            <Link href="/">
              <a>
                Home
              </a>
            </Link>
            {' | '}
            <a href="#" onClick={aboutText === 'About' && this.loading}>
              {aboutText}
            </a>
          </nav>
        </header>

        {children}

        <footer>
          This is the footer
        </footer>
      </div>
    );
  }
}

export default Layout;
