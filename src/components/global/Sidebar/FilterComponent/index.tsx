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
import { keyframes } from "@emotion/react";
import { Dayjs } from "dayjs";

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const StyledDatePicker = styled(DatePicker)(({}) => ({
  animation: `${appear} 1s ease-in-out`,
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
  animation: `${appear} 1s ease-in-out`,
  "& .MuiCheckbox-root": {
    transition: "transform 0.05s",
    "&:active": {
      animation: `${scaleUp} 0.05s forwards`,
    },
  },
}));

const AnimatedTypography = styled(Typography)(({}) => ({
  animation: `${appear} 1s ease-in-out`,
}));

interface FilterProps {
  onCheckboxChange: (selectedEntity: string | null) => void;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  onCheckboxChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [state, setState] = React.useState({
    CLI: true,
    BLCBP: false,
    YES: false,
  });

  const nullifyValues = () => {
    onStartDateChange(null);
    onEndDateChange(null);
  };

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
        BLCBP: boolean;
        YES: boolean;
      }),
    }));

    // Call the provided callback function when checkbox is clicked
    onCheckboxChange(checked ? name : null);
  };

  const handleStartDateChange = (newValue: unknown) => {
    const date = (newValue as Dayjs)?.startOf("day") || null;
    if (date && endDate && date.isAfter(endDate)) {
      alert("Start date must be lesser than or equal to end date");
      nullifyValues();
    } else {
      onStartDateChange(date);
    }
  };

  const handleEndDateChange = (newValue: unknown) => {
    const date = (newValue as Dayjs)?.startOf("day") || null;
    if (date && startDate && date.isBefore(startDate)) {
      alert("End date must be greater than or equal to start date");
      nullifyValues();
    } else {
      onEndDateChange(date);
    }
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
        <AnimatedTypography
          variant="h5"
          sx={{
            color: "#c1c5de",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Filters
        </AnimatedTypography>
      </div>

      {/* Date Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "40px 0 15px 25px",
        }}
      >
        <AnimatedTypography
          variant="h6"
          color="#c1c5de"
          fontWeight="600"
          fontSize={14}
        >
          DATE
        </AnimatedTypography>
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
              value={startDate}
              onChange={handleStartDateChange}
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
              value={endDate}
              onChange={handleEndDateChange}
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
        <AnimatedTypography
          variant="h6"
          color="#c1c5de"
          fontWeight="600"
          fontSize={14}
        >
          ENTITY
        </AnimatedTypography>
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
              <StyledFormControlLabel
                control={
                  <Checkbox
                    checked={state.YES}
                    onChange={handleChange}
                    name="YES"
                    sx={{
                      color: "#c1c5de",
                      "&.Mui-checked": {
                        color: "#c1c5de",
                      },
                    }}
                  />
                }
                label="YES"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default FilterComponent;
