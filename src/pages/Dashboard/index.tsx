import React from 'react';
import Header from '../../components/global/Header';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import components from Recharts library

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
        {/* Render other cards as before */}
        {data.length > 2 && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[2].title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
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
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
