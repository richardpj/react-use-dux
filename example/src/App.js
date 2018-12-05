import React from 'react'

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

const App = (props) => {

    return (
      <section className="todoapp">
          <Header />
          <List />
          <Footer />
      </section>
    );
};

export default App;