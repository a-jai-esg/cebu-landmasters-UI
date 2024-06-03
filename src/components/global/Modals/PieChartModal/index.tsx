import React from "react";
import { Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomPieChartComponent from "../../../../pages/Dashboard/cards/CustomPieChartComponent";
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
            <CustomPieChartComponent
              pieData={pieData}
              title={title}
              colors={["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE", "#7B9BB1"]}
            />
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default PieChartModal;
