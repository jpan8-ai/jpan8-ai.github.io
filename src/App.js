import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <h1>Welcome to My App</h1>
        <p>This is a simple React application.</p>
      </main>
      <footer>
        <p>&copy; 2025 Jie Pan's Personal Website</p>
      </footer>
    </div>
  );
}

export default App;
