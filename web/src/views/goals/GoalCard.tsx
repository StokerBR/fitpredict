'use client';
// React Imports
import {Dispatch, SetStateAction} from 'react';

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
import {Calculator} from '@/utils/calculator';
import {hexToRGBA} from '@/utils/hex-to-rgba';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

// Type Imports
import {Goal} from '@/types/goals';
import {InfoDialogPropsType} from '@/components/InfoDialog';

type TotalStat = {
  steps: number;
  stepsWlaked: number;
  calories: string;
  distance: string;
  goalPercentage: number;
};

type Props = {
  goal: Goal;
  setInfoDialogProps: Dispatch<SetStateAction<InfoDialogPropsType>>;
};

function GoalCard({goal, setInfoDialogProps}: Props) {
  const theme = useTheme();
  const {user, goals, setGoals} = useAuth();
  const calculator = new Calculator(user.height, user.weight);

  const distance = calculator.stepsToDistance(goal?.steps || 0);

  const statsTotal: TotalStat = {
    steps: goal?.steps || 0,
    stepsWlaked: goal?.stepsWalked || 0,
    calories: calculator.stepsToCalories(goal?.steps || 0).toFixed(2),
    distance:
      distance > 1000 ? (distance / 1000).toFixed(2) : distance.toFixed(2),
    goalPercentage: (goal?.stepsWalked / goal?.steps) * 100 || 0,
  };

  const canEdit = goal?.stepsWalked <= goal?.steps && !goal?.completedAt;

  function deleteGoal() {
    const newGoals = goals?.map(goalItem => {
      if (goalItem.id === goal.id) {
        return {
          ...goalItem,
          deleted: true,
        };
      }
      return goalItem;
    });
    setGoals(newGoals);
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
                      {statsTotal.distance || 0.0}{' '}
                      {distance > 1000 ? 'Km' : 'm'}
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
                <IconButton onClick={() => console.log('teste')}>
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
