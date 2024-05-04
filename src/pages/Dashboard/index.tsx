// Dashboard.tsx
import React from 'react';
import Header from '../../components/global/Header';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface DashboardProps {
  data: {
    title: string;
    content: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <>
      <Header title = 'Financial Dashboard - Income Statement' />
      <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {item.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
    
  );
};

export default Dashboard;
