import React from "react";
import { ProSidebar, MenuItem, Menu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import LogoComponent from "./LogoComponent";
import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import FilterComponent from "./FilterComponent";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#24274c",
        fontWeight: selected === title ? 600 : "normal", // Setting font weight based on selected state
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      className="sidebar-item"
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarComponent = () => {
  const [selected, setSelected] = useState("Income Statement");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          borderRadius: "12.5px",
          background: `${`#24274c`} !important`,
          color: "#c1c5de",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          marginLeft: "25px",
          padding: "5px 30px 5px 20px !important",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
          borderLeft: "none",
          "&:hover, &:active": {
            color: "#333 !important",
            fontSize: "16px",
            fontWeight: 600,
            backgroundColor: "#c1c5de", // Change to desired background color when hovered or clicked
          },
        },
        "& .pro-menu-item.active": {
          color: "#c1c5de !important",
        },
      }}
    >
      <ProSidebar>
        <Menu iconShape="square">
          {/* Logo Component */}
          <Box>
            <LogoComponent />
          </Box>
          {/* Income Statement Button */}
          <Box
            sx={{
              paddingTop: "30px",
            }}
          >
            <Item
              title="Income Statement"
              to="/dashboard"
              icon={<CurrencyExchangeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          {/* Filter Component */}
          <Box
            sx={{
              paddingTop: "30px",
              marginLeft: "25px",
            }}
          >
            <FilterComponent />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComponent;
