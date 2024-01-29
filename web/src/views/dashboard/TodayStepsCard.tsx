'use client';
// Next Import
import Image from 'next/image';

//Mui Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// Icons Imports
import Whatshot from '@mui/icons-material/Whatshot';
import PinDropIcon from '@mui/icons-material/PinDrop';

// Third party imports
import moment from 'moment';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

function TodayStepsCard() {
  const {stats} = useAuth();

  const statsToday = stats?.find(
    stat => moment(stat.date).startOf('day') === moment().startOf('day')
  );

  if (statsToday?.distance) {
    statsToday.distance = statsToday.distance / 100;
  }

  if (statsToday?.calories) {
    statsToday.calories = statsToday.calories / 1000;
  }

  return (
    <Card sx={{width: '100%'}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Hoje
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/running.png"
              alt="Running Icon"
              priority
              width={30}
              height={30}
            />
            <Typography variant="h5" sx={{ml: 3, mt: 0.6}}>
              {statsToday?.steps || 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Passos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={'auto'}>
                    <PinDropIcon sx={{color: 'success.dark'}} />
                  </Grid>
                  <Grid item xs>
                    <Typography sx={{mt: -0.5}} variant="h6">
                      {statsToday?.distance?.toFixed(2) || '0.00'} m
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} sx={{justifyContent: 'flex-end'}}>
                  <Grid item xs={'auto'}>
                    <Whatshot sx={{color: 'orange'}} />
                  </Grid>
                  <Grid item xs={'auto'}>
                    <Typography sx={{mt: -0.5}} variant="h6">
                      {statsToday?.calories?.toFixed(2) || '0.00'} Kcal
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TodayStepsCard;
