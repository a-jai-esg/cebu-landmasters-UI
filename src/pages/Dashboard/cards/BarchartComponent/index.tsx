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
import singleValueRowDataInterface from "../../../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
interface barDataInterface {
  barData: singleValueRowDataInterface[];
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
          margin={{ left: 45, top: 30, right: 40 }}
          style={{ backgroundColor: "#E4F4FA" }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          <Bar
            dataKey="value"
            fill="#2BA9DF"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarchartComponent;
