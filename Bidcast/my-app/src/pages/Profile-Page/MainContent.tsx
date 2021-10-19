// import { faExternalLinkAlt, faPodcast } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Card, Image } from "react-bootstrap";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./Sidebar";

export function MainContent() {
  const [toggled, setToggled] = useState(false);
  console.log(toggled);
  
  const handleToggleSidebar = () => {
    setToggled(!false);
  };
  // const [show, setShow] = useState(false);
  // console.log(show);
  
  // const showSidebar = () => {
  //   setShow(!show);
  // };
  // console.log(showSidebar);
  
  // const hideSidebar = () => {
  //   setShow(false);
  // };
  // console.log(hideSidebar);
  
  return (
    <div>
      <main>
        <div
          className="btn_toggle"
          onClick={() => {
            handleToggleSidebar()
          }}
        >
          {toggled? <Sidebar /> : " "}
          <FaBars />
        </div>
        <header>Testing</header>
      </main>
    </div>
  );
}
