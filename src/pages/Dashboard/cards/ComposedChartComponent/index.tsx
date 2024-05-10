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
import multipleValuesRowDataInterface from "../../../../common/interfaces/data/objects/forms/multipleValuesRowDataInterface";
import titleStringInterface from "../../../../common/interfaces/components/titleStringInterface";

interface lineDataInterface {
  lineData: multipleValuesRowDataInterface[];
}

const ComposedChartComponent = ({
  lineData,
  title,
}: lineDataInterface & titleStringInterface) => {
  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart
          data={lineData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" barSize={40} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ComposedChartComponent;
