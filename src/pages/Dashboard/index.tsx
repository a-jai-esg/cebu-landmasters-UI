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
                <Typography color="textSecondary" gutterBottom>
                  {data[0].content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* Render Card 2 and Card 3 */}
        {data.length > 1 && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {data[1].title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {data[1].content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {data.length > 2 && (
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {data[2].title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {data[2].content}
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
                    <Typography color="textSecondary" gutterBottom>
                      {data[3].content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </>
        )}
        {data.length > 4 && (
          <Grid item xs={16} sm={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {data[4].title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {data[4].content}
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
