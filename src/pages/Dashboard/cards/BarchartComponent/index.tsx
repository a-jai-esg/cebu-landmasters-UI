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

// This function transforms the revenue data into the bar chart data format
const transformData = (data: revenueDataInterface[]) => {
  return data.map((entry) => ({
    name: entry?.name,
    management_fees: entry.revenues?.management_fees
      ? parseFloat((entry.revenues.management_fees / 1_000_000).toFixed(2))
      : 0,
    rental: entry.revenues?.rental
      ? parseFloat((entry.revenues.rental / 1_000_000).toFixed(2))
      : 0,
    sale_of_real_estates: entry.revenues?.sale_of_real_estates
      ? parseFloat((entry.revenues.sale_of_real_estates / 1_000_000).toFixed(2))
      : 0,
    hotel_operations: entry.revenues?.hotel_operations
      ? parseFloat((entry.revenues.hotel_operations / 1_000_000).toFixed(2))
      : 0,
  }));
};

// Function to format numbers with commas and 2 decimal places
const formatNumberWithCommasAndDecimals = (number: number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
      <ResponsiveContainer width="100%" height={315}>
        <BarChart
          data={transformedData}
          margin={{ left: 20, top: 30, right: 40 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={formatNumberWithCommasAndDecimals} />
          <Legend />
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
