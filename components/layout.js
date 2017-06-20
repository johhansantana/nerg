import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import NavBar from './navBar';
import CSSTag from './CSSTag';
import material from '!/styles/material.scss';

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
    const { production } = this.state;
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
        <CSSTag style={material} />
        <header>
          <NavBar />
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
