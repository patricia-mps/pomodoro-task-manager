import Router from './router';
import Header from './components/header';
import './index.scss';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Router />
      </main>
    </>
  );
}

export default App;
