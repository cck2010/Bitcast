import { Sidebar } from "./Sidebar";
import "./Profilepage.scss";
import { MainContent } from "./MainContent";
// import { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";

export function ProfilePage() {
  return (
    <div>
      <div className="profile_page">
          <Sidebar />
          <MainContent />
      </div>
    </div>
  );
}
