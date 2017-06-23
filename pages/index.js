import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import apolloClient from '!/lib/initApollo';
import initRedux from '!/lib/initRedux';
import Home from '!/containers/home';
/**
 * Component to show the home container.
 */
class App extends React.Component {
  static async getInitialProps(ctx) {
    let serverState = {};
    // Evaluate the composed component's getInitialProps()
    let composedInitialProps = {};
    if (App.getInitialProps) {
      composedInitialProps = await App.getInitialProps(ctx);
    }
    if (!process.browser) { // eslint-disable-line
      const apollo = apolloClient();
      const redux = initRedux(apollo);
      // Run all graphql queries
      const app = (
        <ApolloProvider client={apollo} store={redux}>
          <Home {...composedInitialProps} />
        </ApolloProvider>
      );
      await getDataFromTree(app);
      const state = redux.getState();
      serverState = {
        apollo: { // Make sure to only include Apollo's data state
          data: state.apollo.data
        }
      };
    }
    return {
      serverState,
      ...composedInitialProps
    };
  }

  constructor(props) {
    super(props);
    this.apollo = apolloClient();
    this.store = initRedux(this.apollo, props.serverState);
  }

  render() {
    return (
      <ApolloProvider client={this.apollo} store={this.store}>
        <Home {...this.props} />
      </ApolloProvider>
    );
  }
}

export default App;
