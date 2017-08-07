import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Layout from '!/components/layout'

class WithoutSSR extends Component {
  render() {
    const { posts: { loading, allPosts } } = this.props
    return (
      <Layout title="Without Server Side Rendering">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>
                Posts
              </h1>
              <p>
                Try refreshing, you'll <strong>see</strong> the `fetching posts...` text
              </p>
              <p>
                To create new posts and comments you can go to{' '}
                <a href="/graphql">Graphql GUI</a> and play with the mutations and queries.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 table-responsive">
              {
                loading &&
                <h2>fetching posts...</h2>
              }
              {
                !loading &&
                <table className="table">
                  <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th># of comments</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    allPosts.map((post, index) => (
                      <tr key={index}>
                        <th scope="row">{post.title}</th>
                        <td>{post.content}</td>
                        <td>
                          <ul>
                            {
                              post.comments.map((comment, index) => (
                                <li key={index}>
                                  <strong>{comment.title}</strong>: {comment.comment}
                                </li>
                              ))
                            }
                          </ul>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const getPosts = gql`query {
    allPosts {
        id
        title
        content
        comments {
            id
            title
            comment
        }
    }
}`
export default compose(
  graphql(getPosts, { name: 'posts' })
)(WithoutSSR)
