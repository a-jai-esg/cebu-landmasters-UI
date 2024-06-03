import React from "react";
import { Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BarchartComponent from "../../../../pages/Dashboard/cards/BarchartComponent";
import revenueDataInterface from "../../../../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";

interface BarChartModalProps {
    open: boolean;
    onClose: () => void;
    barData: revenueDataInterface[];
    title: string | null;
  }
  
  const BarChartModal: React.FC<BarChartModalProps> = ({ open, onClose, barData, title }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            outline: "none",
          }}
        >
          <Card sx={{ width: "80%", maxHeight: "90vh", overflow: "auto", borderRadius: 3, boxShadow: 6, position: "relative" }}>
            <CardContent>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <BarchartComponent barData={barData} title={title} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  };
  
  export default BarChartModal;
