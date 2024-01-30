'use client';
// React Imports
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

// Api Imports
import {Api} from '@/services/api/api';
import {GOALCONTROLL} from '@/services/endpoints/goal';

// MUI Imports
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import Box, {BoxProps} from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Drawer, {DrawerProps} from '@mui/material/Drawer';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// Form Imports
import z from 'zod';

// Third party imports
import moment from 'moment';

// Icons Imports
import CloseIcon from 'mdi-material-ui/Close';
import Whatshot from '@mui/icons-material/Whatshot';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

// Type Imports
import {Goal} from '@/types/goals';
import {FieldErrors} from 'react-hook-form';
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

// Utils Imports
import {getErrorDialogProps} from '@/components/InfoDialog';

const Header = styled(Box)<BoxProps>(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.light,
}));

type GoalType = 'steps' | 'calories' | 'distance';

type Errors = {
  steps: boolean;
  calories: boolean;
  distance: boolean;
};

type FormGoalDrawerProps = DrawerProps & {
  open: boolean;
  goalId?: number;
  toggle: () => void;
  refreshGoals: () => void;
  setInfoDialogProps: Dispatch<SetStateAction<InfoDialogPropsType>>;
};

function getInputLabel(goalType: GoalType) {
  switch (goalType) {
    case 'steps':
      return 'Passos*';
    case 'calories':
      return 'Calorias (kcal)*';
    case 'distance':
      return 'Distância (m)*';
  }
}

function getInputError(goalType: GoalType, goal: Goal) {
  switch (goalType) {
    case 'steps':
      return !goal?.steps;
    case 'calories':
      return !goal?.calories;
    case 'distance':
      return !goal?.distance;
  }
}

function getInputErrorText(goalType: GoalType, goal: Goal) {
  switch (goalType) {
    case 'steps':
      return 'Insira a quantidade de passos';
    case 'calories':
      return 'Insira a quantidade de calorias';
    case 'distance':
      return 'Insira a distância a ser percorrida';
  }
}

function FormGoalDrawer({
  open,
  toggle,
  goalId,
  refreshGoals,
  setInfoDialogProps,
  ...rest
}: FormGoalDrawerProps) {
  const {calculator} = useAuth();
  const [goal, setGoal] = useState<Goal>();
  const [errors, setErrors] = useState<Errors>();
  const [goalType, setGoalType] = useState<GoalType>('steps');

  const defaultValues: Goal = {
    steps: 0,
    calories: 0,
    distance: 0,
    stepsWalked: 0,
  };

  const schema = z.coerce.number().gte(0, 'Insira a quantidade de passos');

  async function onSubmit() {
    const okValue =
      schema.safeParse(goal?.[goalType] || 0).success || goal?.[goalType] === 0;
    if (okValue) {
      let newGoal = defaultValues;
      switch (goalType) {
        case 'steps':
          newGoal = {
            ...newGoal,
            steps: Math.round(+goal?.[goalType]),
            calories: Math.round(calculator.stepsToCalories(goal?.[goalType])),
            distance: Math.round(calculator.stepsToDistance(goal?.[goalType])),
          };
          break;
        case 'calories':
          newGoal = {
            ...newGoal,
            calories: Math.round(+goal?.[goalType]),
            steps: Math.round(calculator.caloriesToSteps(goal?.[goalType])),
            distance: Math.round(
              calculator.caloriesToDistance(goal?.[goalType])
            ),
          };
          break;
        case 'distance':
          newGoal = {
            ...newGoal,
            distance: Math.round(+goal?.[goalType]),
            steps: Math.round(calculator.distanceToSteps(goal?.[goalType])),
            calories: Math.round(
              calculator.distanceToCalories(goal?.[goalType])
            ),
          };
          break;
      }
      newGoal.lastSync = moment().toISOString();
      try {
        await Api[goalId ? 'put' : 'post'](GOALCONTROLL(goalId), newGoal);
        handleClose();
        refreshGoals();
        setInfoDialogProps({
          open: true,
          dialogType: 'success',
        });
      } catch (error) {
        setInfoDialogProps(getErrorDialogProps(error));
      }
    } else {
      setErrors({...errors, [goalType]: true});
    }
  }

  useEffect(() => {
    async function getGoal() {
      try {
        const response = await Api.get<Goal>(GOALCONTROLL(goalId));
        setGoal(response?.data);
      } catch (error) {
        setInfoDialogProps(getErrorDialogProps(error));
      }
    }

    if (open && goalId) {
      getGoal();
    }
  }, [goalId, open, setInfoDialogProps]);

  function handleClose() {
    toggle();
    setGoal(null);
    setGoalType('steps');
  }

  const handleChangeGoalType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGoalType = (event.target as HTMLInputElement).value as GoalType;
    setGoalType(newGoalType);
    setErrors(null);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value?.replace(
      /\D/g,
      ''
    );
    const newGoal = {...goal, [event.target.name]: newValue};
    setGoal(newGoal);
  };

  const handleOnBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    const error = !schema.safeParse(newValue).success;
    setErrors({...errors, [event.target.name]: error});
  };

  let estimatedGoal = {
    steps: 0,
    calories: 0,
    distance: 0,
  };

  if (calculator) {
    estimatedGoal = {
      steps:
        goalType === 'steps'
          ? goal?.[goalType]
          : goalType === 'calories'
          ? calculator.caloriesToSteps(goal?.[goalType])
          : calculator.distanceToSteps(goal?.[goalType]),
      calories:
        goalType === 'steps'
          ? calculator.stepsToCalories(goal?.[goalType])
          : goalType === 'calories'
          ? goal?.[goalType]
          : calculator.distanceToCalories(goal?.[goalType]),
      distance:
        goalType === 'steps'
          ? calculator.stepsToDistance(goal?.[goalType])
          : goalType === 'calories'
          ? calculator.caloriesToDistance(goal?.[goalType])
          : goal?.[goalType],
    };
  }

  return (
    <Drawer
      {...rest}
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <Header>
        <Typography variant="h6" color="white">
          {!!goalId ? 'Editar meta' : 'Criar meta'}
        </Typography>
        <CloseIcon
          fontSize="small"
          onClick={handleClose}
          sx={{cursor: 'pointer', color: 'white'}}
        />
      </Header>
      <Box sx={{px: 5, pt: 5}}>
        <Typography variant="body2">
          Os campos com asterisco (*) são de preenchimento obrigatório.
        </Typography>
      </Box>
      <Box sx={{p: 5}}>
        <form>
          <FormControl fullWidth sx={{mb: 6}}>
            <RadioGroup
              row
              name={'goalType'}
              value={goalType}
              onChange={handleChangeGoalType}
            >
              <FormControlLabel
                value={'steps'}
                control={<Radio />}
                label={'Passos'}
              />
              <FormControlLabel
                value={'distance'}
                control={<Radio />}
                label={'Distância'}
              />
              <FormControlLabel
                value={'calories'}
                control={<Radio />}
                label={'Calorias'}
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth sx={{mb: 6}}>
            <TextField
              name={goalType}
              type={'number'}
              onBlur={handleOnBlurInput}
              onChange={handleChangeInput}
              error={!!errors?.[goalType]}
              value={goal?.[goalType] || ''}
              label={getInputLabel(goalType)}
              placeholder={getInputLabel(goalType)}
            />
            {!!errors?.[goalType] && (
              <FormHelperText sx={{color: 'error.main'}}>
                {getInputErrorText(goalType, goal)}
              </FormHelperText>
            )}
          </FormControl>
          {goal?.[goalType] && (
            <Grid container spacing={1} sx={{mb: 10}}>
              {goalType !== 'steps' && (
                <Grid item xs={12} spacing={1}>
                  <Grid container>
                    <Grid item xs={'auto'}>
                      <Tooltip title={'Passos'} placement={'top'}>
                        <DirectionsWalkIcon sx={{color: 'primary.light'}} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" sx={{mt: -1}}>
                        Passos estinaos:{' '}
                        {goalType === 'calories'
                          ? calculator.caloriesToSteps(goal?.[goalType])
                          : calculator.distanceToSteps(goal?.[goalType])}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {goalType !== 'distance' && (
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                      <Tooltip title={'Distância'} placement={'top'}>
                        <PinDropIcon sx={{color: 'success.dark'}} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" sx={{mt: -1}}>
                        Distância estimada:{' '}
                        {estimatedGoal?.distance >= 1000
                          ? (estimatedGoal?.distance / 1000).toFixed(2)
                          : estimatedGoal?.distance?.toFixed(2) || '0.00'}{' '}
                        {estimatedGoal?.distance > 1000 ? 'km' : 'm'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {goalType !== 'calories' && (
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                      <Tooltip title={'Calorias'} placement={'top'}>
                        <Whatshot sx={{color: 'orange'}} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" sx={{mt: -1}}>
                        Calorias estimadas:{' '}
                        {estimatedGoal?.calories?.toFixed(2) || '0.00'} kcal
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
          <Box>
            <Button fullWidth onClick={onSubmit} variant="contained">
              Salvar meta
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default FormGoalDrawer;
