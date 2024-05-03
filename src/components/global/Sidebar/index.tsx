import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import LogoComponent from "../Logo";

const SidebarComponent = () => {
  return (
    <>
      <Sidebar
        rootStyles={{
          borderRadius: "15px",
          backgroundColor: "#24274c",
          color: "aliceblue",
          fontWeight: 600,
        }}
      >
        <LogoComponent />
        <Menu
          rootStyles={{
            backgroundColor: "#24274c",
            color: "#fff",
          }}
        >
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarComponent;
