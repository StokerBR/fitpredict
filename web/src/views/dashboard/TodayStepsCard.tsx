'use client';
// Next Import
import Image from 'next/image';

//Mui Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {useTheme} from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// Icons Imports
import Whatshot from '@mui/icons-material/Whatshot';
import PinDropIcon from '@mui/icons-material/PinDrop';

// Third party imports
import moment from 'moment';

// Utils Imports
import {Calculator} from '@/utils/calculator';
import {hexToRGBA} from '@/utils/hex-to-rgba';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

type TotalStat = {
  steps: number;
  calories: string;
  distance: string;
};

function TodayStepsCard() {
  const theme = useTheme();
  const {stats, user} = useAuth();
  const calculator = new Calculator(user.height, user.weight);

  const stepsToday =
    stats?.find(stat =>
      moment(stat.date).startOf('day').isSame(moment().startOf('day'))
    )?.steps || 0;

  const distance = calculator.stepsToDistance(stepsToday);
  const totalStat: TotalStat = {
    steps: stepsToday,
    calories: calculator.stepsToCalories(stepsToday).toFixed(2),
    distance:
      distance > 1000 ? (distance / 1000).toFixed(2) : distance.toFixed(2),
  };

  return (
    <Card
      sx={{
        width: '100%',
        background: hexToRGBA(theme.palette.primary[theme.palette.mode], 0.1),
      }}
    >
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
              {totalStat.steps}
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
                      {totalStat?.distance || '0.00'}{' '}
                      {distance > 1000 ? 'Km' : 'm'}
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
                      {totalStat?.calories || '0.00'} Kcal
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
