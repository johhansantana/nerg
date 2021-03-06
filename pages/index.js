import React from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '!/lib/initApollo';
import initRedux from '!/lib/initRedux';
import Home from '!/containers/home';
/**
 * Component to show the home container.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.apollo = apolloClient();
    this.store = initRedux(this.apollo);
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
