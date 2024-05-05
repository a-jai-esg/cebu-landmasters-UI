import React from "react";
import Header from "../../components/global/Header";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  CartesianGrid,
} from "recharts";

import SecondaryPieChartComponent from "./cards/SecondaryPieChartComponent";
import IncomeStatementTable from "./cards/IncomeStatementTableComponent";
import BarchartComponent from "./cards/BarchartComponent";
import PrimaryPieChartComponent from "./cards/PrimaryPieChartComponent";

interface DashboardProps {
  data: {
    title: string | null;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Sample data for the doughnut chart
  const doughnutData = [
    { name: "Category A", value: 200 },
    { name: "Category B", value: 300 },
  ];

  // Sample data for the bar chart
  const barData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  ];

  // Sample data for the composed chart
  const lineData = [
    { name: "Page 1", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page 2", uv: 300, pv: 1398, amt: 2210 },
    { name: "Page 3", uv: 200, pv: 9800, amt: 2290 },
    { name: "Page 4", uv: 278, pv: 3908, amt: 2000 },
    { name: "Page 5", uv: 189, pv: 4800, amt: 2181 },
  ];

  // Sample data for the pie chart
  const pieData = [
    { name: "Category A", value: 200 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 500 },
    { name: "Category D", value: 100 },
  ];

  function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number
  ) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }

  const rows = [
    createData(
      0,
      "16 Mar, 2019",
      "Elvis Presley",
      "Tupelo, MS",
      "VISA ⠀•••• 3719",
      312.44
    ),
    createData(
      1,
      "16 Mar, 2019",
      "Paul McCartney",
      "London, UK",
      "VISA ⠀•••• 2574",
      866.99
    ),
    createData(
      2,
      "16 Mar, 2019",
      "Tom Scholz",
      "Boston, MA",
      "MC ⠀•••• 1253",
      100.81
    ),
    createData(
      3,
      "16 Mar, 2019",
      "Michael Jackson",
      "Gary, IN",
      "AMEX ⠀•••• 2000",
      654.39
    ),
    createData(
      4,
      "15 Mar, 2019",
      "Bruce Springsteen",
      "Long Branch, NJ",
      "VISA ⠀•••• 5919",
      212.79
    ),
  ];

  return (
    <>
      <Header title="Financial Dashboard - Income Statement" />
      <Grid container spacing={1.5}>
        {/* Doughnut charts */}
        {data.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SecondaryPieChartComponent
                        doughNutData={doughnutData}
                        title="Gross Profit Margin"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SecondaryPieChartComponent
                        doughNutData={doughnutData}
                        title="Opex Ratio"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SecondaryPieChartComponent
                        doughNutData={doughnutData}
                        title="EBITDA Margin"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SecondaryPieChartComponent
                        doughNutData={doughnutData}
                        title="Conso NIAT"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SecondaryPieChartComponent
                        doughNutData={doughnutData}
                        title="Parent NIAT"
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Bar chart */}
        {data.length > 1 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <BarchartComponent title={data[1].title} barData={barData} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Pie Chart*/}
        {data.length > 2 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <PrimaryPieChartComponent
                  pieData={pieData}
                  title={data[2].title}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Income Statement Table */}
        {/* Table*/}
        {data.length > 3 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography
                  fontSize={20}
                  color="#333"
                  fontWeight="bold"
                  padding={1}
                >
                  {data[3].title}
                </Typography>
                <IncomeStatementTable data={rows} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Composed Chart*/}
        {data.length > 4 && (
          <Grid item xs={16} sm={8}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography
                  fontSize={20}
                  color="#333"
                  fontWeight="bold"
                  padding={1}
                >
                  {data[4].title}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart
                    data={lineData}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
