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
import "./Profilepage.scss";
// import { useIntl } from 'react-intl';
import { useState } from "react";

export function Sidebar() {
  // const intl = useIntl()
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = () => {
    setToggled(!false);
  };
  return (
    <div>
      <ProSidebar
        toggled={toggled}
        breakPoint="md"
        collapsedWidth="sm"
        onToggle={handleToggleSidebar}
        className="sidebar_container"
      >
        <SidebarHeader>
          <h3>我的帳號</h3>
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
      </ProSidebar>
    </div>
  );
}
