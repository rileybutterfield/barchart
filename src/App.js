import React from "react";
import { Navbar, Container } from "react-bootstrap";
import ChartWrapper from "./ChartWrapper";
import GenderDropdown from "./GenderDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [gender, setGender] = React.useState("men");

  const genderSelected = (newGender) => {
    console.log(newGender);
    setGender(newGender);
  };

  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Barchart</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <GenderDropdown genderSelected={genderSelected} gender={gender} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender={gender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
