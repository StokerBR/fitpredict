'use client';
// React Imports
import {useState, useEffect} from 'react';

// Api Imports
import {Api} from '@/services/api/api';
import {GOALCONTROLL} from '@/services/endpoints/goal';

// MUI Imports
import Grid from '@mui/material/Grid';

// Custom Components Imports
import GoalCard from '@/views/goals/GoalCard';
import {InfoDialog} from '@/components/InfoDialog';

// Type Imports
import {Goal} from '@/types/goals';
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Utils Imports
import {getErrorDialogProps} from '@/components/InfoDialog';

function DashboardPage() {
  const [goalsList, setGoalsList] = useState<Goal[]>([]);
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

  return (
    <Grid container spacing={6} sx={{justifyContent: 'center'}}>
      <Grid item xs={12} sm={9} md={6} lg={4.5} xl={4}>
        <Grid container spacing={6}>
          {goalsList?.map(goal => (
            <Grid item xs={12} key={goal.id}>
              <GoalCard
                goal={goal}
                refreshGoals={getGoalsList}
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
    </Grid>
  );
}

export default DashboardPage;
