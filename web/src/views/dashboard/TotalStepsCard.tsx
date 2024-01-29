'use client';
// React Imports
import {useState, useEffect} from 'react';

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

// Utils Imports
import {hexToRGBA} from '@/utils/hex-to-rgba';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

type TotalStat = {
  steps: number;
  calories: string;
  distance: string;
  distanceUnit: string;
};

function TotalStepsCard() {
  const theme = useTheme();
  const {user, calculator} = useAuth();
  const [statsTotal, setStatsTotal] = useState<TotalStat>();

  useEffect(() => {
    if (user?.totalSteps && calculator) {
      const distance = calculator?.stepsToDistance(user?.totalSteps || 0);
      setStatsTotal({
        steps: user?.totalSteps || 0,
        calories: calculator?.stepsToCalories(user?.totalSteps || 0).toFixed(2),
        distance:
          distance > 1000 ? (distance / 1000).toFixed(2) : distance.toFixed(2),
        distanceUnit: distance > 1000 ? 'Km' : 'm',
      });
    }
  }, [user, calculator]);

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
              Total
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
              {statsTotal?.steps || 0}
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
                      {statsTotal?.distance || '0.00'}{' '}
                      {statsTotal?.distanceUnit || 'm'}
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
                      {statsTotal?.calories || '0.00'} Kcal
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

export default TotalStepsCard;
