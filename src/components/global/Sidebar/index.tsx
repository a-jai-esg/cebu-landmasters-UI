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
  onCheckboxClick: (selectedEntity: string | null) => void;
  onCurrentFileUpload: (file: File | null) => void;
  onPreviousFileUpload: (file: File | null) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  onCheckboxClick,
  onCurrentFileUpload,
  onPreviousFileUpload,
}) => {
  const [selected, setSelected] = useState("Income Statement");
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleMenuItemClick = (menuItem: string) => {
    setSelected(menuItem);
    menuItem === "Income Statement"
      ? setIsFilterVisible((prevState) => !prevState)
      : setIsFilterVisible(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        color: "#c1c5de",
        "& .pro-sidebar-inner": {
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
            backgroundColor: "#c1c5de",
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
                fontWeight: selected === "Income Statement" ? 600 : "normal",
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
              <FilterComponent
                onCheckboxChange={onCheckboxClick}
                onCurrentFileUpload={onCurrentFileUpload}
                onPreviousFileUpload={onPreviousFileUpload}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComponent;
