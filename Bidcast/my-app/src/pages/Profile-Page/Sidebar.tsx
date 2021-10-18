// import { Navbar } from "react-bootstrap";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import bidcast_logo from "../bidcast_logo.png";
import "./Profilepage.scss";

export function Sidebar() {
  return (
    <div>
      <ProSidebar
        toggled
        breakPoint="md"
        collapsedWidth="sm"
        onToggle={() => {}}
        className="sidebar_container"
      >
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          <SidebarHeader>
            <img
              alt="bidcast_logo"
              src={bidcast_logo}
              width="120"
              height="60"
              className="d-inline-block align-top sidebar_logo"
            />
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <SubMenu title="拍賣資訊">
                <MenuItem>我的拍賣出價</MenuItem>
                <MenuItem>我的拍賣商品</MenuItem>
              </SubMenu>
              <MenuItem>即將開始的直播</MenuItem>
              <MenuItem>帳戶資料</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <div className="logout_button">登出</div>
          </SidebarFooter>
        {/* </Navbar.Collapse> */}
      </ProSidebar>
    </div>
  );
}
