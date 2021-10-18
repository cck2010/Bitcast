import { Sidebar } from "./Sidebar";
import "./Profilepage.scss";
import { MainContent } from "./MainContent";
import { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";

export function ProfilePage() {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value:boolean) => {
    setToggled(value);
  };

  return (
    <div>
      <div className={`profilePage ${toggled ? 'toggled' : ''}`}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
