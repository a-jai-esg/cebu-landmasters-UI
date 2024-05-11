import { Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import titleStringInterface from "../../../../common/interfaces/components/titleStringInterface";
import singleValueRowDataInterface from "../../../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import * as _ from "lodash";

interface gaugeDataInterface {
  gaugeData: singleValueRowDataInterface | null;
}

const GaugeComponent = ({
  gaugeData,
  title,
}: gaugeDataInterface & titleStringInterface): JSX.Element => {
  // gauge settings
  const gaugeColors = ["#413ea0", "#D7DBFA"];

  const settings = {
    width: 150,
    height: 95,
    value: 60,
  };

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "18px",
        }}
      >
        <Gauge
          {...settings}
          cornerRadius="50%"
          value={gaugeData?.value}
          startAngle={0}
          endAngle={360}
          innerRadius="80%"
          outerRadius="100%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 16,
              fontWeight: 400,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              //fill: "#52b202",
              fill: gaugeColors[0],
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
              alignItems: "center",
            },
          })}
        />
      </Box>
      <Box>
        <Typography
          fontSize={16}
          sx={{
            textAlign: "center",
          }}
          color="#333"
          fontWeight={600}
          marginTop={-3}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default GaugeComponent;
