import React from "react";
import { Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PieChartComponentV2 from "../../../../pages/Dashboard/cards/PieChartComponentV2";
import operatingExpenseDataInterface from "../../../../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";

interface PieChartModalProps {
  open: boolean;
  onClose: () => void;
  pieData: operatingExpenseDataInterface[];
  title: string;
}

const PieChartModal: React.FC<PieChartModalProps> = ({
  open,
  onClose,
  pieData,
  title,
}) => {
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
        <Card
          sx={{
            width: "70%",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 3,
            boxShadow: 6,
            position: "relative",
          }}
        >
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
            <PieChartComponentV2 pieData={pieData} title={title} />
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default PieChartModal;
