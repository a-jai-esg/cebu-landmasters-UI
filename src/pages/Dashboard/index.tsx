import React, { useEffect, useState } from "react";
import Header from "../../components/global/Header";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import GaugeComponent from "./cards/GaugeComponent";
import IncomeStatementTable from "./cards/IncomeStatementTableComponent";
import BarchartComponent from "./cards/BarchartComponent";
import PrimaryPieChartComponent from "./cards/PieChartComponent";
import ComposedChartComponent from "./cards/ComposedChartComponent";
import chartDataInterface from "../../common/interfaces/data/charts/chartDataInterface";
import * as _ from "lodash";
import singleValueRowDataInterface from "../../common/interfaces/data/objects/forms/singleValueRowDataInterface";

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

  const lineData = chartData.chartData.flatMap((data) => {
    return data.lineData;
  });

  const pieData = chartData.chartData.flatMap((data) => {
    return data.pieData;
  });

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
    <>
      <Header title="Financial Dashboard - Income Statement" />
      <Grid container spacing={1.5} key={reloadKey}>
        {/* Doughnut charts */}
        {cardTitles.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent style={{ textAlign: "center" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <GaugeComponent
                        gaugeData={gaugeData[0]}
                        title="Gross Profit Margin"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <GaugeComponent
                        gaugeData={gaugeData[1]}
                        title="Opex Ratio"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <GaugeComponent
                        gaugeData={gaugeData[2]}
                        title="EBITDA Margin"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <GaugeComponent
                        gaugeData={gaugeData[3]}
                        title="Conso NIAT"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
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
            <Card sx={{ borderRadius: 3 }} style={{ height: "100%" }}>
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
            <Card sx={{ borderRadius: 3 }} style={{ height: "100%" }}>
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
            <Card sx={{ borderRadius: 3 }} style={{ height: "100%" }}>
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
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <ComposedChartComponent
                  lineData={lineData}
                  title={cardTitles[4].title}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
