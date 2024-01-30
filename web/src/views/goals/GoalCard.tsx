'use client';
// React Imports
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

// Api Imports
import {Api} from '@/services/api/api';
import {GOALCONTROLL} from '@/services/endpoints/goal';

//Mui Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {useTheme} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

// Icons Imports
import EditIcon from '@mui/icons-material/Edit';
import Whatshot from '@mui/icons-material/Whatshot';
import DeleteIcon from '@mui/icons-material/Delete';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

// Third party imports
import moment from 'moment';

// Custom Components Imports
import {CircularProgressWithLabel} from '@/components/circular-progress-with-label';

// Utils Imports
import {hexToRGBA} from '@/utils/hex-to-rgba';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

// Type Imports
import {Goal} from '@/types/goals';
import {
  InfoDialogPropsType,
  getErrorDialogProps,
} from '@/components/InfoDialog';

type TotalStat = {
  steps: number;
  calories: string;
  distance: string;
  stepsWlaked: number;
  distanceUnit: string;
  goalPercentage: number;
};

type Props = {
  goal: Goal;
  refreshGoals: () => void;
  openEditGoalDrawer: (goalId: number) => void;
  setInfoDialogProps: Dispatch<SetStateAction<InfoDialogPropsType>>;
};

function GoalCard({
  goal,
  refreshGoals,
  openEditGoalDrawer,
  setInfoDialogProps,
}: Props) {
  const theme = useTheme();
  const {calculator} = useAuth();
  const [statsTotal, setStatsTotal] = useState<TotalStat>(null);

  useEffect(() => {
    if (goal) {
      if (calculator) {
        const distance = calculator.stepsToDistance(goal?.steps || 0);
        setStatsTotal({
          steps: goal?.steps || 0,
          stepsWlaked: goal?.stepsWalked || 0,
          calories: calculator.stepsToCalories(goal?.steps || 0).toFixed(2),
          distance: distance.toFixed(2),
          goalPercentage: (goal?.stepsWalked / goal?.steps) * 100 || 0,
          distanceUnit: distance > 1000 ? 'Km' : 'm',
        });
      }
    } else {
      setStatsTotal(null);
    }
  }, [goal, calculator]);

  const canEdit = goal?.stepsWalked <= goal?.steps && !goal?.completedAt;

  async function deleteGoal() {
    try {
      await Api.delete(GOALCONTROLL(goal.id));
      refreshGoals();
      setInfoDialogProps({
        open: true,
        dialogType: 'success',
      });
    } catch (error) {
      setInfoDialogProps(getErrorDialogProps(error));
    }
  }

  function handleDelete() {
    setInfoDialogProps({
      open: true,
      noIcon: true,
      dialogType: 'alert',
      title: 'Excluir meta',
      confirmBtnText: 'Excluir',
      text: 'Tem certeza que deseja excluir essa meta?',
      handleConfirm: () => deleteGoal(),
    });
  }

  if (!statsTotal) return null;

  return (
    <Card
      sx={{
        width: '100%',
        background: hexToRGBA(theme.palette.primary[theme.palette.mode], 0.1),
      }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={'auto'}>
            <Grid container sx={{ml: -2, mt: 4.5}}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircularProgressWithLabel value={statsTotal.goalPercentage} />
              </Grid>

              <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Typography variant="caption" color="text.secondary">
                  {goal?.stepsWalked || 0} / {goal?.steps || 0}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={'auto'}>
                    <Tooltip title={'Passos'} placement={'top'}>
                      <DirectionsWalkIcon sx={{color: 'primary.light'}} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" sx={{mt: -1}}>
                      {statsTotal.steps || 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={'auto'}>
                    <Tooltip title={'Distância'} placement={'top'}>
                      <PinDropIcon sx={{color: 'success.dark'}} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" sx={{mt: -1}}>
                      {statsTotal.distance || '0.00'}{' '}
                      {statsTotal?.distanceUnit || 'm'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={'auto'}>
                    <Tooltip title={'Calorias'} placement={'top'}>
                      <Whatshot sx={{color: 'orange'}} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" sx={{mt: -1}}>
                      {statsTotal.calories || '0.00'} Kcal
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {moment(goal?.completedAt).isValid() && (
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                      <Tooltip title={'Completado em'} placement={'top'}>
                        <CheckBoxIcon sx={{color: 'blue'}} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" sx={{mt: -1}}>
                        {moment(goal?.completedAt).format('DD/MM/YYYY HH:mm')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={'auto'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: canEdit ? 'space-between' : 'center',
            }}
          >
            {canEdit && (
              <Tooltip title={'Editar meta'} placement={'top'}>
                <IconButton onClick={() => openEditGoalDrawer(goal.id)}>
                  <EditIcon sx={{color: 'primary.light'}} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title={'Excluir meta'} placement={'top'}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon sx={{color: 'grey.400'}} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GoalCard;
