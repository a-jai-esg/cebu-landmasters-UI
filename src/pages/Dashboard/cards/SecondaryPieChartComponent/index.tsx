import { Box, Typography } from "@mui/material";
import { Cell, Label, Pie, PieChart } from "recharts";

interface rowDataInterface {
  name: string;
  value: number;
}

interface doughnutDataInterface {
  doughNutData: rowDataInterface[];
}

interface titleStringInterface {
  title: string | null;
}

const SecondaryPieChartComponent = ({
  doughNutData,
  title,
}: doughnutDataInterface & titleStringInterface): JSX.Element => {
  const doughnutColors = ["#413ea0", "#D7DBFA"];
  const categoryAValue = doughNutData.find(
    (entry) => entry.name === "Category A"
  )?.value;

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "15px",
        }}
      >
        <PieChart width={120} height={85}>
          <Pie
            data={doughNutData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={35}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {doughNutData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={doughnutColors[index % doughnutColors.length]}
              />
            ))}
            <Label value={categoryAValue} position="center" />
          </Pie>
        </PieChart>
      </Box>
      <Box>
        <Typography fontSize={16} color="#333" fontWeight={600} marginTop={-3}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SecondaryPieChartComponent;
