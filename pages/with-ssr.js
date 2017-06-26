import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import apolloClient from '!/lib/initApollo';
import initRedux from '!/lib/initRedux';
import WithSSR from '!/containers/with-ssr';
/**
 * Component to show the home container.
 */
class App extends React.Component {
  static async getInitialProps() {
    let serverState = {};
    if (!process.browser) {
      const apollo = apolloClient();
      const redux = initRedux(apollo);
      // Run all graphql queries
      const app = (
        <ApolloProvider client={apollo} store={redux}>
          <WithSSR />
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
        <WithSSR {...this.props} />
      </ApolloProvider>
    );
  }
}
export default App;
