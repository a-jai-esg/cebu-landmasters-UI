import React from "react";
import { Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IncomeStatementTable from "../../../../pages/Dashboard/cards/IncomeStatementTableComponent";
import incomeStatementRowDataInterface from "../../../../common/interfaces/data/charts/incomeStatementRowDataInterface";

interface IncomeStatementTableModalProps {
  open: boolean;
  onClose: () => void;
  data: incomeStatementRowDataInterface[];
  title: string;
}

const IncomeStatementTableModal: React.FC<IncomeStatementTableModalProps> = ({
  open,
  onClose,
  data
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
            <IncomeStatementTable data={data} />
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default IncomeStatementTableModal;
