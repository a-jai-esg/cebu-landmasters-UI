import { Box, Typography } from "@mui/material";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import singleValueRowDataInterface from "../../../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import titleStringInterface from "../../../../common/interfaces/components/titleStringInterface";

interface composedChartDataInterface {
  composedChartData: singleValueRowDataInterface[];
}

const ComposedChartComponent = ({
  composedChartData,
  title,
}: composedChartDataInterface & titleStringInterface) => {
  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart
          data={composedChartData}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" barSize={40} fill="#413ea0" />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ComposedChartComponent;
