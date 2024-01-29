// MUI Imports
import Grid from '@mui/material/Grid';

// Custom Components Imports
import TodayStepsCard from '@/views/dashboard/TodayStepsCard';
import TotalStepsCard from '@/views/dashboard/TotalStepsCard';

function DashboardPage() {
  return (
    <Grid container spacing={6} sx={{justifyContent: 'center'}}>
      <Grid item xs={12} sm={6} md={4.5} lg={3.5} xl={3}>
        <TodayStepsCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4.5} lg={3.5} xl={3}>
        <TotalStepsCard />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
