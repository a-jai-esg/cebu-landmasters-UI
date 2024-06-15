import * as React from "react";
import Typography from "@mui/material/Typography";
import { FilterAltOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

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
  onFileUpload: (file: File | null) => void;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const FilterComponent: React.FC<FilterProps> = ({
  onCheckboxChange,
  onFileUpload,
}) => {
  const [state, setState] = React.useState({
    CLI: true,
    BLCBP: false,
    YES: false,
  });

  const [filename, setFilename] = React.useState("");

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

  const handleIncomeStatementFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    const file = files ? files[0] : null;
    setFilename(file ? file.name : "");
    onFileUpload(file);
  };

  return (
    <Box>
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
      <div>
        {/* file upload */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "70px 0 15px 20px",
          }}
        >
          <AnimatedTypography
            variant="h6"
            color="#c1c5de"
            sx={{ fontWeight: 600, fontSize: "14px" }}
          >
            INCOME STATEMENT
          </AnimatedTypography>
        </div>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "40px",
            marginRight: "25px",
          }}
        >
          <input
            type="file"
            id="currentFile"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleIncomeStatementFileUpload}
          />
          <label htmlFor="currentFile">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: "#c1c5de",
                color: "#24274c",
                "&:active": {
                  transform: "none",
                },
                "&:focus": {
                  transform: "none",
                },
              }}
            >
              {truncateText(filename, 15) || "CHOOSE FILE"}
            </Button>
          </label>
        </div>
        <div
          style={{
            marginTop: "15px",
            marginLeft: "40px",
            marginRight: "25px",
          }}
        >
          <label htmlFor="clearButton">
            <Button
              variant="outlined"
              component="span"
              sx={{
                backgroundColor: "#24274c",
                color: "#c1c5de",
                borderColor: "#c1c5de",
                "&:active": {
                  transform: "none",
                },
                "&:focus": {
                  transform: "none",
                },
              }}
            >
              CLEAR FILE
            </Button>
          </label>
        </div>
      </div>
    </Box>
  );
};

export default FilterComponent;
