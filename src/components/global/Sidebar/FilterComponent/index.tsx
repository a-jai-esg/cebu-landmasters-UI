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
import { styled } from "@mui/system";

const StyledDatePicker = styled(DatePicker)(({}) => ({
  "& .MuiSvgIcon-root": {
    color: "#c1c5de",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#c1c5de",
      borderColor: "#c1c5de",
    },
    "&:hover fieldset": {
      borderColor: "#c1c5de",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c1c5de",
    },
    color: "#c1c5de", // Change input text color
  },
  "& .MuiInputLabel-root": {
    color: "#c1c5de", // Change label text color
  },
  "& .MuiFormHelperText-root": {
    color: "#c1c5de", // Change helper text color
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({}) => ({
  color: "#c1c5de", // Change label text color
}));

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
          margin: "60px 0 5px 25px",
        }}
      >
        <FilterAltOutlined
          sx={{
            paddingRight: "10px",
            color: "#c1c5de",
            fontWeight: 600,
          }}
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
            <StyledDatePicker
              label="Start Date"
              slotProps={{ textField: { variant: "outlined" } }}
            />
          </LocalizationProvider>
        </Box>
        {/* End Date */}
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              label="End Date"
              slotProps={{ textField: { variant: "outlined" } }}
            />
          </LocalizationProvider>
        </Box>
      </div>

      {/* Entity Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "60px 0 15px 25px",
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
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={CLI}
                    onChange={handleChange}
                    name="CLI"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
                  />
                }
                label="CLI"
              />
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={CPH}
                    onChange={handleChange}
                    name="CPH"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
                  />
                }
                label="CPH"
              />
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={CPM}
                    onChange={handleChange}
                    name="CPM"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
                  />
                }
                label="CPM"
              />
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={ASF}
                    onChange={handleChange}
                    name="ASF"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
                  />
                }
                label="ASF"
              />
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={BLCBP}
                    onChange={handleChange}
                    name="BLCBP"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
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
