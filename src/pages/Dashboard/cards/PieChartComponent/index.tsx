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

const COLORS = ["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE"];

// This function transforms the expenses data into the pie chart data format
const transformData = (
  data: OperatingExpenseDataInterface[]
): { name: string; value: number }[] => {
  return data.flatMap((entry) => {
    if (entry.expenses) {
      return Object.entries(entry.expenses).map(([key, value]) => ({
        name: key.replace(/_/g, " "), // Optional: replace underscores with spaces for better readability
        value: value < 0 ? (value *= -1) : 0, // Ensure that null values are treated as signed integers
      }));
    }
    return [];
  });
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
      <ResponsiveContainer width="100%" height={255}>
        <PieChart style={{ backgroundColor: "#E4F4FA" }}>
          <Pie
            data={transformedData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {transformedData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PrimaryPieChartComponent;
