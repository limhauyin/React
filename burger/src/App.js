import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilders from './containers /BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <BurgerBuilders/>
        </Layout>
      </div>
    );
  }
}

export default App;
