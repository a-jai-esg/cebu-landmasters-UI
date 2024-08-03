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
  const [selected, setSelected] = useState<string | null>("Income Statement");
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleMenuItemClick = (menuItem: string) => {
    setSelected(menuItem);
    setIsFilterVisible(
      menuItem === "Income Statement" ||
        menuItem === "Balance Sheet" ||
        menuItem === "Cash Flow"
    );
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
          background: "#24274c !important",
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
          <LogoComponent />
          {[
            {
              name: "Income Statement",
              icon: <CurrencyExchangeOutlined />,
              link: "/dashboard",
            },
            {
              name: "Balance Sheet",
              icon: <AccountBalanceOutlined />,
              link: "/balance-sheet",
            },
            { name: "Cash Flow", icon: <MoneyOutlined />, link: "/cash-flow" },
          ].map((item, index) => (
            <MenuItem
              key={item.name}
              active={selected === item.name}
              style={{
                color: "#24274c",
                fontWeight: selected === item.name ? 600 : "normal",
                paddingTop: index === 0 ? "20px" : "15px",
              }}
              onClick={() => handleMenuItemClick(item.name)}
              icon={item.icon}
              className="sidebar-item"
            >
              <Typography>{item.name}</Typography>
              <Link to={item.link} />
            </MenuItem>
          ))}
          {isFilterVisible && (
            <Box sx={{ marginTop: "5vh", marginLeft: "25px" }}>
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
