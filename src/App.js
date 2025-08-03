import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { Nav, Stack } from 'react-bootstrap';

const axiosInstance = Axios.create()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack>
          <Stack direction="horizontal" style={{justifyContent: "space-between", borderRadius: "5px", 
            background: "linear-gradient(to right, #c6f78eff, #5e996dff)", height: "100px"}}>
            <div>1</div>
            <div>Jie Pan's Personal Website</div>
            <div>3</div>
          </Stack>
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/'>About Me</Nav.Link>
            </Nav.Item>
          </Nav>
        </Stack>
      </header>
      <main className="Main-Style">
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
