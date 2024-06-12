import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
  ResponsiveContainer,
} from "recharts";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
  ResponsiveContainer,
} from "recharts";
import TitleStringInterface from "../../../../common/interfaces/components/titleStringInterface";
import OperatingExpenseDataInterface from "../../../../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import { Typography } from "@mui/material";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
    </g>
  );
};

// Mapping of full names to their abbreviations
const abbreviations: { [key: string]: string } = {
  commissions: "COM",
  management_fee_expense: "MFE",
  professional_and_legal_fees: "PLF",
  security_and_janitorial_services: "SJS",
  taxes_and_licenses: "TL",
  commissions: "COM",
  management_fee_expense: "MFE",
  professional_and_legal_fees: "PLF",
  security_and_janitorial_services: "SJS",
  taxes_and_licenses: "TL",
};

// Function to transform the expenses data into the pie chart data format
const transformData = (
  data: OperatingExpenseDataInterface[]
): { name: string; value: number }[] => {
const transformData = (
  data: OperatingExpenseDataInterface[]
): { name: string; value: number }[] => {
  return data.flatMap((entry) => {
    if (entry.expenses) {
      return Object.entries(entry.expenses).map(([key, value]) => ({
        name: abbreviations[key] || key.replace(/_/g, " "), // Use abbreviations if available
        value: value ? parseFloat((Math.abs(value) / 1_000_000).toFixed(2)) : 0,
      }));
    }
    return [];
  });
};

interface CustomPieChartComponentProps {
  pieData: OperatingExpenseDataInterface[];
  colors: string[];
  title: string;
}

const CustomPieChartComponent: React.FC<CustomPieChartComponentProps> = ({
  pieData,
  colors,
  title,
}) => {
const CustomPieChartComponent: React.FC<CustomPieChartComponentProps> = ({
  pieData,
  colors,
  title,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  const transformedData = transformData(pieData);

  return (
    <div>
      <Typography fontSize={20} color="#333" fontWeight="bold" padding={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={315}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={transformedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {transformedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChartComponent;
