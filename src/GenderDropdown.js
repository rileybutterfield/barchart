import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function GenderDropdown({ genderSelected, gender }) {
  const genderLabel = gender[0].toUpperCase() + gender.slice(1, gender.length);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {genderLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => genderSelected("men")}>Men</Dropdown.Item>
        <Dropdown.Item onClick={() => genderSelected("women")}>
          Women
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
