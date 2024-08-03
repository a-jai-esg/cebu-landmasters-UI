import React, { useState } from "react";
import { ProSidebar, MenuItem, Menu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import LogoComponent from "./LogoComponent";
import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import MoneyOutlined from "@mui/icons-material/MoneyOutlined";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import "../../../App.css";

interface SidebarProps {
  onCheckboxClick: (selectedEntity: string | null) => void;
  onFileUpload: (file: File | null) => void;
  onRemoveFile: (remove: boolean | null) => void;
  isUploading: boolean;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  onCheckboxClick,
  onFileUpload,
  onRemoveFile,
  isUploading,
}) => {
  const [selected, setSelected] = useState("Income Statement");
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleMenuItemClick = (menuItem: string) => {
    setSelected(menuItem);

    menuItem === "Income Statement"
      ? setIsFilterVisible((prevState) => !prevState)
      : setIsFilterVisible(false);

    menuItem === "Balance Sheet"
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
              paddingTop: "20px",
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
          {/* Balance Sheet Button*/}
          <Box
            sx={{
              paddingTop: "15px",
            }}
          >
            <MenuItem
              active={selected === "Balance Sheet"}
              style={{
                color: "#24274c",
                fontWeight: selected === "Balance Sheet" ? 600 : "normal",
              }}
              onClick={() => handleMenuItemClick("Balance Sheet")}
              icon={<AccountBalanceOutlined />}
              className="sidebar-item"
            >
              <Typography>Balance Sheet</Typography>
              <Link to="/balance-sheet" />
            </MenuItem>
          </Box>
          {/* Cash Flow Button*/}
          <Box
            sx={{
              paddingTop: "15px",
            }}
          >
            <MenuItem
              active={selected === "Cash Flow"}
              style={{
                color: "#24274c",
                fontWeight: selected === "Cash Flow" ? 600 : "normal",
              }}
              onClick={() => handleMenuItemClick("Cash Flow")}
              icon={<MoneyOutlined />}
              className="sidebar-item"
            >
              <Typography>Cash Flow</Typography>
              <Link to="/cash-flow" />
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
                onFileUpload={onFileUpload}
                onRemoveFile={onRemoveFile}
                isUploading={isUploading}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComponent;
