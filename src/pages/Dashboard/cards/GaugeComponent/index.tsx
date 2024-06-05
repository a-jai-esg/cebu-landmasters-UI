import { Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import titleStringInterface from "../../../../common/interfaces/components/titleStringInterface";
import singleValueRowDataInterface from "../../../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import * as _ from "lodash";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)(({}) => ({
  animation: `${fadeIn} 1s ease-in-out`,
}));

interface gaugeDataInterface {
  gaugeData: singleValueRowDataInterface | null;
}

const GaugeComponent = ({
  gaugeData,
  title,
}: gaugeDataInterface & titleStringInterface): JSX.Element => {
  // Determine gauge color based on the value
  const gaugeValue = gaugeData?.value ?? 0;
  const gaugeColor = gaugeValue >= 0 ? "#413ea0" : "#D62828";

  const settings = {
    width: 150,
    height: 95,
    value: gaugeValue,
  };

  return (
    <AnimatedBox>
      <Box
        sx={{
          marginBottom: "18px",
        }}
      >
        <Gauge
          {...settings}
          cornerRadius="50%"
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
              fill: gaugeColor,
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
    </AnimatedBox>
  );
};

export default GaugeComponent;
