import { Typography, Box } from "@mui/material";
import "../../../App.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <Box mb="5px;">
      <Typography
        variant="h5"
        color="#333"
        fontWeight="600"
        sx={{ marginBottom: "auto" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
