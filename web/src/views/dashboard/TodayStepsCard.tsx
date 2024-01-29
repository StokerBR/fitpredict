'use client';
// React Imports
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

// Next Import
import Image from 'next/image';

// Api Imports
import {Api} from '@/services/api/api';
import {GETSTATSTODAY} from '@/services/endpoints/stat';

//Mui Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {useTheme} from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

// Icons Imports
import Whatshot from '@mui/icons-material/Whatshot';
import PinDropIcon from '@mui/icons-material/PinDrop';

// Utils Imports
import {hexToRGBA} from '@/utils/hex-to-rgba';
import {getErrorDialogProps} from '@/components/InfoDialog';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

// Types Imports
import {Stat} from '@/types/user';
import {InfoDialogPropsType} from '@/components/InfoDialog';

type Props = {
  setInfoDialogProps: Dispatch<SetStateAction<InfoDialogPropsType>>;
};

type TodayStats = {
  steps: number;
  calories: string;
  distance: string;
  distanceUnit: string;
};

function TodayStepsCard({setInfoDialogProps}: Props) {
  const theme = useTheme();
  const {calculator} = useAuth();
  const [todayStats, setTodayStats] = useState<TodayStats>();

  useEffect(() => {
    async function getStatsToday() {
      try {
        const response = await Api.get<Stat>(GETSTATSTODAY);

        const distance = calculator.stepsToDistance(response?.data?.steps || 0);
        setTodayStats({
          steps: response?.data?.steps || 0,
          distance:
            distance > 1000
              ? (distance / 1000).toFixed(2)
              : distance.toFixed(2),
          calories: calculator
            .stepsToCalories(response?.data?.steps || 0)
            .toFixed(2),
          distanceUnit: distance > 1000 ? 'Km' : 'm',
        });
      } catch (error) {
        setInfoDialogProps(getErrorDialogProps(error));
      }
    }
    if (calculator) {
      getStatsToday();
    }
  }, [calculator, setInfoDialogProps]);

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
              {todayStats?.steps || 0}
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
                      {todayStats?.distance || '0.00'}{' '}
                      {todayStats?.distanceUnit || 'm'}
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
                      {todayStats?.calories || '0.00'} Kcal
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
