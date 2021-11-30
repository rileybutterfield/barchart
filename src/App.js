import { Navbar, Container } from "react-bootstrap";
import ChartWrapper from "./ChartWrapper";

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Barchartly</Navbar.Brand>
      </Navbar>
      <Container>
        <ChartWrapper />
      </Container>
    </div>
  );
}

export default App;
