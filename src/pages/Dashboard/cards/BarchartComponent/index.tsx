import { Box, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import rowDataInterface from "../../../../common/interfaces/data/objects/forms/multipleValuesRowDataInterface";

interface barDataInterface {
  barData: rowDataInterface[];
}

interface titleStringInterface {
  title: string | null;
}

const BarchartComponent = ({
  barData,
  title,
}: barDataInterface & titleStringInterface): JSX.Element => {
  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={barData}
          margin={{ top: 30, right: 20 }}
          style={{ backgroundColor: "#E4F4FA" }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          <Bar
            dataKey="pv"
            fill="#2BA9DF"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#85C7EE"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="amt"
            fill="#99D8E9"
            activeBar={<Rectangle fill="orange" stroke="red" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarchartComponent;
