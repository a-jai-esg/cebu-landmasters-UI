import React from 'react';
import Header from '../../components/global/Header';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'; // Import components from Recharts library

interface DashboardProps {
  data: {
    title: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Sample data for the bar chart
  const chartData = [
    { name: 'Category 1', value: 400 },
    { name: 'Category 2', value: 300 },
    { name: 'Category 3', value: 200 },
    { name: 'Category 4', value: 500 },
    { name: 'Category 5', value: 600 },
  ];

  // Sample data for the line chart
  const lineData = [
    { name: 'Page 1', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page 2', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page 3', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page 4', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page 5', uv: 189, pv: 4800, amt: 2181 },
  ];

    // Sample data for the pie chart
    const pieData = [
      { name: 'Category A', value: 200 },
      { name: 'Category B', value: 300 },
      { name: 'Category C', value: 500 },
      { name: 'Category D', value: 100 },
    ];
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <Header title="Financial Dashboard - Income Statement" />
      <Grid container spacing={2}>
        {/* Render Card 1 */}
        {data.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[0].title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Render Card 2 */}
        {data.length > 1 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[1].title}
                </Typography>
                {/* Render the bar chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Render Card 3 - Line Chart */}
        {data.length > 2 && (
          <Grid item xs={12} sm={6} md={4}>
             <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[2].title}
                </Typography>
                {/* Render the pie chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Render other cards as before */}
        {data.length > 3 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[3].title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {data.length > 4 && (
          <Grid item xs={16} sm={8}>
             <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[4].title}
                </Typography>
                {/* Render the line chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="amt" stroke="#ffc658" />
                  </LineChart>
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
