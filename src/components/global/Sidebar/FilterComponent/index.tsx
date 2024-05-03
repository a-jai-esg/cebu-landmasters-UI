import Typography from "@mui/material/Typography";
import { FilterAltOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

const FilterComponent = () => {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", margin: "15px 0 5px 20px" }}>
                <FilterAltOutlined sx={{ paddingRight: "15px", color: "#c1c5de", fontWeight: 600 }} />
                <Typography variant="h6" color="#c1c5de" fontWeight="600" fontSize={14}>
                    Filters
                </Typography>
            </div>
            <div style={{ marginTop: "10px", marginLeft: "25px", marginRight: "25px" }}>
                <Box sx={{ marginBottom: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            sx={{
                                fontWeight: 400,
                                fontSize: "inherit",
                                color: "#c1c5de",
                                '& input': {
                                    fontSize: "8px",
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginBottom: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            sx={{
                                fontWeight: 400,
                                fontSize: "inherit",
                                color: "#c1c5de",
                                '& input': {
                                    fontSize: "8px",
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>  
            </div>
        </>
    );
}

export default FilterComponent;
