// import { faExternalLinkAlt, faPodcast } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Card, Image } from "react-bootstrap";
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export function MainContent() {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value: boolean) => {
    setToggled(value);
  };
  return (
    <div>
      <main>
      <div className="btn_toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>Testing</header>
      </main>
    </div>
  );
}
