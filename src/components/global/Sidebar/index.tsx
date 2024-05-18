import React, { useState } from "react";
import { ProSidebar, MenuItem, Menu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import LogoComponent from "./LogoComponent";
import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import "../../../App.css";

interface SidebarProps {
  onCheckboxClick: (selectedEntity: string | null) => void; // Callback function to handle checkbox click
}

const SidebarComponent: React.FC<SidebarProps> = ({ onCheckboxClick }) => {
  const [selected, setSelected] = useState("Income Statement"); // Track selected menu item
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Track visibility of filter component

  const handleMenuItemClick = (menuItem: string) => {
    setSelected(menuItem);
    if (menuItem === "Income Statement") {
      setIsFilterVisible((prevState) => !prevState); // Toggle filter visibility
    } else {
      setIsFilterVisible(false); // Hide filter if another menu item is selected
    }
  };

  return (
    <Box
      sx={{
        height: "98vh",
        display: "flex",
        flexDirection: "column",
        color: "#c1c5de",
        "& .pro-sidebar-inner": {
          borderRadius: "12.5px",
          background: `${`#24274c`} !important`,
          color: "#c1c5de",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          backgroundColor: isFilterVisible ? "#c1c5de" : "inherit",
          color: isFilterVisible ? "#333 !important" : "inherit",
          marginLeft: "25px",
          padding: "5px 30px 5px 20px !important",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
          borderLeft: "none",
          "&:hover": {
            color: "#333 !important",
            fontSize: "16px",
            fontWeight: 800,
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
            <MenuItem
              active={selected === "Income Statement"}
              style={{
                color: "#24274c",
                fontWeight: selected === "Income Statement" ? 600 : "normal", // Setting font weight based on selected state
              }}
              onClick={() => handleMenuItemClick("Income Statement")}
              icon={<CurrencyExchangeOutlined />}
              className="sidebar-item"
            >
              <Typography>Income Statement</Typography>
              <Link to="/dashboard" />
            </MenuItem>
          </Box>
          {/* Filter Component */}
          {isFilterVisible && (
            <Box
              sx={{
                marginTop: "5vh",
                marginLeft: "25px",
              }}
            >
              {/* Pass the onCheckboxClick callback to the FilterComponent */}
              <FilterComponent
                onCheckboxChange={onCheckboxClick}
                isVisible={isFilterVisible}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComponent;
