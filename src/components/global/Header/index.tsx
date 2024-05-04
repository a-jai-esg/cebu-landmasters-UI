import { Typography, Box } from "@mui/material";

const Header = (title: string): JSX.Element =>{
    return (
    <Box mb="30px;">
      <Typography
        variant="h5"
        color="#333"
        fontWeight="bold"
        sx={{ marginBottom: "5px" }}
      >
        {title}
      </Typography>
    </Box>
    );
}

export default Header;