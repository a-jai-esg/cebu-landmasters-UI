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

interface FilterProps {
  onCheckboxChange: (selectedEntity: string | null) => void; // Callback function to handle checkbox change
}

const FilterComponent: React.FC<FilterProps> = ({ onCheckboxChange }) => {
  const [state, setState] = React.useState({
    CLI: true,
    CPH: false,
    CPM: false,
    ASF: false,
    BLCBP: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Update state
    setState((prevState) => ({
      ...(Object.fromEntries(
        Object.keys(prevState).map((key) => [
          key,
          key === name ? checked : false,
        ])
      ) as {
        CLI: boolean;
        CPH: boolean;
        CPM: boolean;
        ASF: boolean;
        BLCBP: boolean;
      }),
    }));

    // Call the provided callback function when checkbox is clicked
    onCheckboxChange(checked ? name : null);
  };

  return (
    <>
      {/* Filters Subheader */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "30px 0 5px 0px",
        }}
      >
        <FilterAltOutlined
          sx={{
            paddingRight: "5px",
            color: "#c1c5de",
            fontWeight: 600,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: "#c1c5de",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Filters
        </Typography>
      </div>

      {/* Date Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "40px 0 15px 25px",
        }}
      >
        <Typography variant="h6" color="#c1c5de" fontWeight="600" fontSize={14}>
          DATE
        </Typography>
      </div>

      <div
        style={{
          marginTop: "20px",
          marginLeft: "25px",
          marginRight: "35px",
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
          margin: "40px 0 15px 25px",
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
                    checked={state.CLI}
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
                    checked={state.CPH}
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
                    checked={state.CPM}
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
                    checked={state.ASF}
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
                    checked={state.BLCBP}
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
