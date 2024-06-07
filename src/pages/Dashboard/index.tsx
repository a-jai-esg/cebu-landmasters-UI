import React, { useEffect, useState } from "react";
import Header from "../../components/global/Header";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import GaugeComponent from "./cards/GaugeComponent";
import IncomeStatementTable from "./cards/IncomeStatementTableComponent";
import BarchartComponent from "./cards/BarchartComponent";
import PrimaryPieChartComponent from "./cards/CustomPieChartComponent";
import ComposedChartComponent from "./cards/ComposedChartComponent";
import BarChartModal from "../../components/global/Modals/BarChartModal";
import PieChartModal from "../../components/global/Modals/PieChartModal";
import IncomeStatementTableModal from "../../components/global/Modals/IncomeStatementTableModal";
import chartDataInterface from "../../common/interfaces/data/charts/chartDataInterface";
import * as _ from "lodash";
import singleValueRowDataInterface from "../../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import revenueDataInterface from "../../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";
import incomeStatementRowDataInterface from "../../common/interfaces/data/charts/incomeStatementRowDataInterface";

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
  const [isBarChartModalOpen, setIsBarChartModalOpen] =
    useState<boolean>(false);
  const [isPieChartModalOpen, setIsPieChartModalOpen] =
    useState<boolean>(false);
  const [isIncomeStatementTableModalOpen, setIsIncomeStatementTableModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (reload) {
      // Reload logic here
      setReloadKey((prevKey) => prevKey + 1);
    }
  }, [reload]);

  // get bar data
  const barData: (revenueDataInterface | null)[] = chartData.chartData.flatMap(
    (data) => {
      return data.barData ? data.barData.flatMap((result) => result ?? []) : [];
    }
  );

  const barDataFiltered: revenueDataInterface[] = barData.filter(
    (data) => data !== null
  );

  // get gauge data
  const gaugeData: (singleValueRowDataInterface | null)[] =
    chartData.chartData.flatMap((data) => {
      return data.gaugeData
        ? data.gaugeData.flatMap((result) => {
            return result.filter(
              (item): item is singleValueRowDataInterface =>
                item.name === `${entityFilter}`
            );
          })
        : [];
    });

  // get composed chart data
  const composedChartData: (singleValueRowDataInterface | null)[] =
    chartData.chartData.flatMap((data) => {
      return data.composedChartData
        ? data.composedChartData.flatMap((result) => {
            return result;
          })
        : [];
    });

  const composedChartFiltered: singleValueRowDataInterface[] =
    composedChartData.filter((data) => data !== null);

  // get pie data
  const pieData: (operatingExpenseDataInterface | null)[] =
    chartData.chartData.flatMap((data) => {
      return data.pieData
        ? data.pieData.flatMap((result) => {
            return result.filter(
              (item): item is operatingExpenseDataInterface =>
                item.name === `${entityFilter}`
            );
          })
        : [];
    });

  const pieDataFiltered: operatingExpenseDataInterface[] = pieData.filter(
    (data) => data !== null
  );

  // get income statement table data
  const incomeStatementData: (incomeStatementRowDataInterface | null)[] =
    chartData.chartData.flatMap((data) => {
      return data.incomeStatementTableData
        ? data.incomeStatementTableData.flatMap((result) => {
            return result;
          })
        : [];
    });

  const incomeStatementDataFiltered: incomeStatementRowDataInterface[] =
    incomeStatementData.filter((data) => data !== null);

  // Modal handlers
  const handleOpenBarChartModal = () => setIsBarChartModalOpen(true);
  const handleCloseBarChartModal = () => setIsBarChartModalOpen(false);

  const handleOpenPieChartModal = () => setIsPieChartModalOpen(true);
  const handleClosePieChartModal = () => setIsPieChartModalOpen(false);

  const handleOpenIncomeStatementTableModal = () =>
    setIsIncomeStatementTableModalOpen(true);
  const handleCloseIncomeStatementTableModal = () =>
    setIsIncomeStatementTableModalOpen(false);

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
                    <Grid item xs={6} sm={4} md={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[0]}
                          title="Gross Profit Margin (%)"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[1]}
                          title="Opex Ratio (%)"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[2]}
                          title="EBITDA Margin (%)"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[3]}
                          title="Conso NIAT (%)"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <GaugeComponent
                          gaugeData={gaugeData[4]}
                          title="Parent NIAT (%)"
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
              <Card sx={{ borderRadius: 3, boxShadow: 6, height: "fit" }}>
                <CardContent>
                  <BarchartComponent
                    barData={barDataFiltered}
                    title={cardTitles[1].title}
                  />
                  <Typography
                    onClick={handleOpenBarChartModal}
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                  >
                    Expand Chart
                  </Typography>
                  <Typography
                    onClick={handleOpenBarChartModal}
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                  >
                    Expand Chart
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Pie Chart*/}
          {cardTitles.length > 2 && (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 6, height: 422 }}>
                <CardContent>
                  <PrimaryPieChartComponent
                    pieData={pieDataFiltered}
                    title={cardTitles[2].title ?? "Pie Chart"}
                    colors={[
                      "#3FB3E5",
                      "#D777C3",
                      "#84E48D",
                      "#85C7EE",
                      "#7B9BB1",
                    ]}
                  />
                  <Typography
                    onClick={handleOpenPieChartModal}
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                  >
                    Expand Chart
                  </Typography>
                  <Typography
                    onClick={handleOpenPieChartModal}
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                  >
                    Expand Chart
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Income Statement Table */}
          {/* Table*/}
          {cardTitles.length > 3 && (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 6, height: "fit" }}>
                <CardContent>
                  <Typography fontSize={20} color="#333" fontWeight="bold">
                    {cardTitles[3].title}
                  </Typography>
                  <IncomeStatementTable data={incomeStatementDataFiltered} />
                  <Typography
                    onClick={handleOpenIncomeStatementTableModal}
                    sx={{
                      cursor: "pointer",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                  >
                    Expand Table
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Composed Chart*/}
          {cardTitles.length > 4 && (
            <Grid item xs={12} sx={{ marginBottom: 3.5 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
                <CardContent>
                  <ComposedChartComponent
                    composedChartData={composedChartFiltered}
                    title={cardTitles[4].title}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
      <BarChartModal
        open={isBarChartModalOpen}
        onClose={handleCloseBarChartModal}
        barData={barDataFiltered}
        title={cardTitles[1].title ?? "Bar Chart"}
      />
      <PieChartModal
        open={isPieChartModalOpen}
        onClose={handleClosePieChartModal}
        pieData={pieDataFiltered}
        title={cardTitles[2].title ?? "Pie Chart"}
      />
      <IncomeStatementTableModal
        open={isIncomeStatementTableModalOpen}
        onClose={handleCloseIncomeStatementTableModal}
        data={incomeStatementDataFiltered}
        title={cardTitles[3].title ?? "Income Statement Table"}
      />
      <BarChartModal
        open={isBarChartModalOpen}
        onClose={handleCloseBarChartModal}
        barData={barDataFiltered}
        title={cardTitles[1].title ?? "Bar Chart"}
      />
      <PieChartModal
        open={isPieChartModalOpen}
        onClose={handleClosePieChartModal}
        pieData={pieDataFiltered}
        title={cardTitles[2].title ?? "Pie Chart"}
      />
      <IncomeStatementTableModal
        open={isIncomeStatementTableModalOpen}
        onClose={handleCloseIncomeStatementTableModal}
        data={incomeStatementDataFiltered}
        title={cardTitles[3].title ?? "Income Statement Table"}
      />
    </Box>
  );
};

export default Dashboard;
