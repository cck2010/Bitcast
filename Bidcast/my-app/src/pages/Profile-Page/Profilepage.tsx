import { Sidebar } from "./Sidebar";
import "./Profilepage.scss";
import { MainContent } from "./MainContent";
// import { Col, Container, Row } from "react-bootstrap";

export function ProfilePage() {
  return (
    <div>
      <div className="profile_container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
