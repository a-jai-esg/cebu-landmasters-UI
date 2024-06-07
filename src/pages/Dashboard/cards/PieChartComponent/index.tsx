import { Box, Typography } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import TitleStringInterface from "../../../../common/interfaces/components/titleStringInterface";
import OperatingExpenseDataInterface from "../../../../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";

interface PieDataInterface {
  pieData: OperatingExpenseDataInterface[];
}

const COLORS = ["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE", "#7B9BB1"];
const COLORS = ["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE", "#7B9BB1"];

// This function transforms the expenses data into the pie chart data format
const transformData = (
  data: OperatingExpenseDataInterface[]
): { name: string; value: number }[] => {
  return data.flatMap((entry) => {
    if (entry.expenses) {
      return Object.entries(entry.expenses).map(([key, value]) => ({
        name: key.replace(/_/g, " "), // Optional: replace underscores with spaces for better readability
        value: value ? parseFloat((Math.abs(value) / 1_000_000).toFixed(2)) : 0, // Divide by one million and round to 2 decimal places
      }));
    }
    return [];
  });
};

// Function to format numbers with commas
const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString();
};

const PrimaryPieChartComponent = ({
  pieData,
  title,
}: PieDataInterface & TitleStringInterface) => {
  const transformedData = transformData(pieData);

  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={385}>
        <PieChart>
          <Pie
            data={transformedData}
            dataKey="value"
            nameKey="name"
            outerRadius={62.5}
            fill="#8884d8"
            label={({ value }) => `${formatNumberWithCommas(value)}`}
          >
            {transformedData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={formatNumberWithCommas} />
          <Legend
            // verticalAlign="middle"
            layout="vertical"
            // align="left"
            // wrapperStyle={{ lineHeight: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PrimaryPieChartComponent;
