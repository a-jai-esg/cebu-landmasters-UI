import { Box, Typography } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface rowDataInterface {
  name: string;
  value: number;
}

interface pieDataInterface {
  pieData: rowDataInterface[];
}

interface titleStringInterface {
  title: string | null;
}

const COLORS = ["#3FB3E5", "#D777C3", "#84E48D", "#85C7EE"];

const PrimaryPieChartComponent = ({
  pieData,
  title,
}: pieDataInterface & titleStringInterface) => {
  return (
    <Box>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart style={{ backgroundColor: "#E4F4FA" }}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
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
