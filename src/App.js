import './App.css';
import Axios from 'axios';
import { Nav, Stack, Image } from 'react-bootstrap';
import Circuit from './components/Circuit';
import logo from "./assets/images/logo.png"
import SunnyDay from './components/SunnyDay';
import { px } from 'framer-motion';

const axiosInstance = Axios.create();
const today = new Date();
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dateStr = `${dayList[today.getDay()]} ${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack>
          <Stack direction="horizontal" style={{justifyContent: "space-between", borderRadius: "5px", 
            height: "100px", backgroundColor: "darkslategrey", paddingLeft: "10px", paddingRight: "10px"}}>
            <div>
              <Image src={logo} style={{height: "80px"}}/>
            </div>
            <div style={{color: "darkseagreen", fontFamily: "cursive"}}>
              <h1>Jie Pan's Website</h1>
            </div>
            <div style={{color: "darkgoldenrod"}}>
              {dateStr}
            </div>
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
        <SunnyDay width="1000px" height="100px"/>
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
