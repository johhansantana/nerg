import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '!/components/layout'

class Home extends Component {
  render() {
    return (
      <Layout title="Home page">
        <div className="container">
          <div className="row">
            <div className="col-12" style={{marginTop: 25}}>
              <h2 className="text-center">
                Examples using GraphQL
              </h2>
            </div>
          </div>
          <div className="row flex-row justify-content-around align-items-center">
            <div className="col-12 col-sm-4">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    Example with SSR
                  </h4>
                  <p className="card-text">
                    This example will fetch the data before rendering the layout.
                    Useful for SEO.
                  </p>
                  <Link href="/with-ssr">
                    <a className="btn btn-primary">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    Example without SSR
                  </h4>
                  <p className="card-text">
                    This example will fetch the data after rendering the layout.
                    Useful for quicker routing changes plus cool loading effects.
                  </p>
                  <Link href="/without-ssr">
                    <a className="btn btn-primary">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Home
