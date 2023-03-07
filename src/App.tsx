import Router from './router';
import Header from './components/header';
import Footer from './components/footer';
import './index.scss';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default App;
