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
import revenueDataInterface from "../../../../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";
interface barDataInterface {
  barData: revenueDataInterface[];
}

interface titleStringInterface {
  title: string | null;
}

const COLORS = ["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE"];

// This function transforms the expenses data into the pie chart data format
const transformData = (data: revenueDataInterface[]) => {
  return data.map((entry) => ({
    name: entry?.name,
    management_fees: entry.revenues?.management_fees,
    rental: entry.revenues?.rental,
    sale_of_real_estates: entry.revenues?.sale_of_real_estates,
    hotel_operations: entry.revenues?.hotel_operations,
  }));
};

const BarchartComponent = ({
  barData,
  title,
}: barDataInterface & titleStringInterface): JSX.Element => {
  const transformedData = transformData(barData);
  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={transformedData}
          margin={{ left: 45, top: 30, right: 40 }}
          style={{ backgroundColor: "#E4F4FA" }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="value" fill="#8884d8" /> */}
          <Bar
            dataKey="sale_of_real_estates"
            fill={COLORS[0]}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="rental"
            fill={COLORS[1]}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="management_fees"
            fill={COLORS[2]}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="hotel_operations"
            fill={COLORS[3]}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarchartComponent;
