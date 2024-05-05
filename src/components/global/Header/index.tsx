import { Typography, Box } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <Box mb="30px;">
      <Typography
        variant="h5"
        color="#333"
        fontWeight="bold"
        sx={{ marginBottom: "auto" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
