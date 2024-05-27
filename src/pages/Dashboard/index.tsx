import React, { useEffect, useState } from "react";
import Header from "../../components/global/Header";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import GaugeComponent from "./cards/GaugeComponent";
import IncomeStatementTable from "./cards/IncomeStatementTableComponent";
import BarchartComponent from "./cards/BarchartComponent";
import PrimaryPieChartComponent from "./cards/PieChartComponent";
import ComposedChartComponent from "./cards/ComposedChartComponent";
import chartDataInterface from "../../common/interfaces/data/charts/chartDataInterface";
import * as _ from "lodash";
import singleValueRowDataInterface from "../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../../common/interfaces/data/operatingExpenseDataInterface";

interface DashboardProps {
  cardTitles: {
    title: string | null;
  }[];
  chartData: chartDataInterface;
  reload: boolean;
  entityFilter: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  cardTitles,
  chartData,
  reload,
  entityFilter,
}) => {
  const [reloadKey, setReloadKey] = useState<number>(0);

  function createData(
    id: number,
    name: string,
    currentYear: number,
    percentage: number,
  ) {
    return { id, name, currentYear, percentage };
  }

  const rows = [
    createData(
      0,
      "Revenue",
      0,
      0,
    ),
    createData(
      1,
      "COGS",
      0,
      0,
    ),
    createData(
      2,
      "Gross Profit",
      0,
      0,
    ),
    createData(
      3,
      "OPEX",
      0,
      0,
    ),
    createData(
      4,
      "Sales",
      0,
      0,
    ),
    createData(
      5,
      "Marketing",
      0,
      0,
    ),
    createData(
      6,
      "IT",
      0,
      0,
    ),
    createData(
      7,
      "General and Admin",
      0,
      0,
    ),
    createData(
      8,
      "Other Income",
      0,
      0,
    ),
    createData(
      9,
      "Other Expenses",
      0,
      0,
    ),
    createData(
      10,
      "EBIT",
      0,
      0,
    ),
    createData(
      11,
      "Interest and Tax",
      0,
      0,
    ),
    createData(
      12,
      "Net Profit",
      0,
      0,
    ),
  ];

  useEffect(() => {
    if (reload) {
      // Reload logic here
      setReloadKey((prevKey) => prevKey + 1);
    }
  }, [reload]);

  // get data
  const barData = chartData.chartData.flatMap((data) => {
    return data.barData;
  });

  const composedChartData: singleValueRowDataInterface[] =
    chartData.chartData.flatMap((data) => {
      return data.composedChartData.flatMap((result) => {
        return result;
      });
    });

  const pieData: operatingExpenseDataInterface[] = chartData.chartData.flatMap(
    (data) => {
      return data.pieData.flatMap((result) => {
        return result.filter(
          (item): item is operatingExpenseDataInterface =>
            item.name === `${entityFilter}`
        );
      });
    }
  );

  const gaugeData: singleValueRowDataInterface[] = chartData.chartData.flatMap(
    (data) => {
      return data.gaugeData.flatMap((result) => {
        return result.filter(
          (item): item is singleValueRowDataInterface =>
            item.name === `${entityFilter}`
        );
      });
    }
  );

  return (
    <Box
      sx={{
        marginTop: "auto",
        height: "94vh",
        marginLeft: "1.5vh",
      }}
    >
      <Header title="Financial Dashboard - Income Statement" />
      <Box>
        <Grid container spacing={1.5} key={reloadKey}>
          {/* Doughnut charts */}
          {cardTitles.length > 0 && (
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
                <CardContent style={{ textAlign: "center" }}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[0]}
                          title="Gross Profit Margin"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[1]}
                          title="Opex Ratio"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[2]}
                          title="EBITDA Margin"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[3]}
                          title="Conso NIAT"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[4]}
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
          {cardTitles.length > 1 && (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ borderRadius: 3, boxShadow: 6 }}
                style={{ height: "100%" }}
              >
                <CardContent>
                  <BarchartComponent
                    title={cardTitles[1].title}
                    barData={barData}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Pie Chart*/}
          {cardTitles.length > 2 && (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ borderRadius: 3, boxShadow: 6 }}
                style={{ height: "100%" }}
              >
                <CardContent>
                  <PrimaryPieChartComponent
                    pieData={pieData}
                    title={cardTitles[2].title}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Income Statement Table */}
          {/* Table*/}
          {cardTitles.length > 3 && (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ borderRadius: 3, boxShadow: 6 }}
                style={{ height: "100%" }}
              >
                <CardContent>
                  <Typography
                    fontSize={20}
                    color="#333"
                    fontWeight="bold"
                    padding={1}
                  >
                    {cardTitles[3].title}
                  </Typography>
                  <IncomeStatementTable data={rows} />
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Composed Chart*/}
          {cardTitles.length > 4 && (
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
                <CardContent>
                  <ComposedChartComponent
                    composedChartData={composedChartData}
                    title={cardTitles[4].title}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
