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
import { useState } from "react";
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { FaList, FaRegHeart } from "react-icons/fa";
import { BsBroadcastPin } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const user = useSelector((state: RootState) => state.authState.user);
  const userInfo = JSON.parse(JSON.stringify(user));

  return (
    <div className="sidebar">
      <ProSidebar collapsed={menuCollapse} width="220px">
        <SidebarHeader>
          <h3 className="sidebar_username pt-3">{userInfo.username}</h3>
          <div className="close_menu" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <SubMenu title="拍賣資訊" icon={<FaList />}>
              <MenuItem>
                我的拍賣出價
                <Link to="/profilePage/my-bids" />
              </MenuItem>
              <MenuItem>
                我的拍賣商品
                <Link to="/profilePage/my-live-products" />
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<BsBroadcastPin />}>收藏的直播</MenuItem>
            <SubMenu title="訂閱" icon={<FaRegHeart />}>
              <MenuItem>
                <Link to="/profilePage/following">訂閱的人</Link>
              </MenuItem>
              <MenuItem>我的粉絲</MenuItem>
            </SubMenu>
            <MenuItem icon={<MdAccountBox />}>
              帳戶資料
              <Link to="/profilePage/accountDetails" />
              {/* <Link to="/accountDetails">帳戶資料</Link> */}
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>登出</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
