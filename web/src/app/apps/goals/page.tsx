'use client';
// React Imports
import {useState, useEffect} from 'react';

// Api Imports
import {Api} from '@/services/api/api';
import {GOALCONTROLL} from '@/services/endpoints/goal';

// MUI Imports
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

// Icons Imports
import AddIcon from '@mui/icons-material/Add';

// Custom Components Imports
import GoalCard from '@/views/goals/GoalCard';
import {InfoDialog} from '@/components/InfoDialog';
import FormGoalDrawer from '@/views/goals/FormGoalDrawer';
import FloatingButton from '@/components/floating-button';

// Type Imports
import {Goal} from '@/types/goals';
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Utils Imports
import {getErrorDialogProps} from '@/components/InfoDialog';

function DashboardPage() {
  const [goalId, setGoalId] = useState<number>();
  const [goalsList, setGoalsList] = useState<Goal[]>([]);
  const [showFormGoalDrawer, setShowFormGoalDrawer] = useState<boolean>(false);
  const [infoDialogProps, setInfoDialogProps] = useState<InfoDialogPropsType>({
    open: false,
  });

  async function getGoalsList() {
    try {
      const response = await Api.get<Goal[]>(GOALCONTROLL());
      if (response?.data?.length > 0) {
        setGoalsList(response?.data);
      } else {
        setGoalsList([]);
      }
    } catch (error) {
      setInfoDialogProps(getErrorDialogProps(error));
    }
  }

  useEffect(() => {
    getGoalsList();
  }, []);

  function handleEditGoal(goalId: number) {
    setGoalId(goalId);
    setShowFormGoalDrawer(true);
  }

  return (
    <Grid container spacing={6} sx={{justifyContent: 'center'}}>
      <Grid item xs={12} sm={9} md={6} lg={4.5} xl={4}>
        <Grid container spacing={6}>
          {goalsList?.map(goal => (
            <Grid item xs={12} key={goal.id}>
              <GoalCard
                goal={goal}
                refreshGoals={getGoalsList}
                openEditGoalDrawer={handleEditGoal}
                setInfoDialogProps={setInfoDialogProps}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <InfoDialog
        open={infoDialogProps.open}
        text={infoDialogProps?.text}
        title={infoDialogProps?.title}
        noIcon={infoDialogProps?.noIcon}
        dialogType={infoDialogProps?.dialogType}
        handleRefresh={infoDialogProps?.handleRefresh}
        handleConfirm={infoDialogProps?.handleConfirm}
        confirmBtnText={infoDialogProps?.confirmBtnText}
        toggle={() =>
          setInfoDialogProps(prevState => ({
            ...prevState,
            open: !prevState.open,
          }))
        }
      />
      <FormGoalDrawer
        goalId={goalId}
        open={showFormGoalDrawer}
        refreshGoals={getGoalsList}
        setInfoDialogProps={setInfoDialogProps}
        toggle={() => setShowFormGoalDrawer(prevState => !prevState)}
      />
      <FloatingButton onClick={() => setShowFormGoalDrawer(true)}>
        <Tooltip title="Criar meta" placement="left">
          <AddIcon />
        </Tooltip>
      </FloatingButton>
    </Grid>
  );
}

export default DashboardPage;
