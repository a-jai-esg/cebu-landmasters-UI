import * as React from "react";
import Typography from "@mui/material/Typography";
import { FilterAltOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const FilterComponent = () => {
  const [state, setState] = React.useState({
    CLI: true,
    CPH: false,
    CPM: false,
    ASF: false,
    BLCBP: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { CLI, CPH, CPM, ASF, BLCBP } = state;

  return (
    <>
      {/* Filters Subheader */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "45px 0 5px 20px",
        }}
      >
        <FilterAltOutlined
          sx={{ paddingRight: "15px", color: "#c1c5de", fontWeight: 600 }}
        />
        <Typography variant="h6" color="#c1c5de" fontWeight="600" fontSize={14}>
          Filters
        </Typography>
      </div>

      {/* Date Filters */}
      <div
        style={{
          marginTop: "20px",
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "50px",
        }}
      >
        {/* Start Date */}
        <Box sx={{ marginBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              sx={{
                fontWeight: 400,
                fontSize: "inherit",
                color: "#c1c5de",
                "& input": {
                  fontSize: "14px",
                  color: "#c1c5de",
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        {/* End Date */}
        <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              sx={{
                fontWeight: 400,
                fontSize: "inherit",
                color: "#c1c5de",
                "& input": {
                  fontSize: "14px",
                  color: "#c1c5de",
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </div>

      {/* Entity Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "60px 0 5px 20px",
        }}
      >
        <Typography variant="h6" color="#c1c5de" fontWeight="600" fontSize={14}>
          ENTITY
        </Typography>
      </div>
      <div
        style={{ marginTop: "10px", marginLeft: "25px", marginRight: "25px" }}
      >
        <Box sx={{ marginBottom: "10px" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup sx={{ marginLeft: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={CLI} onChange={handleChange} name="CLI" />
                }
                label="CLI"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={CPH} onChange={handleChange} name="CPH" />
                }
                label="CPH"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={CPM} onChange={handleChange} name="CPM" />
                }
                label="CPM"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={ASF} onChange={handleChange} name="ASF" />
                }
                label="ASF"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={BLCBP}
                    onChange={handleChange}
                    name="BLCBP"
                  />
                }
                label="BLCBP"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default FilterComponent;
