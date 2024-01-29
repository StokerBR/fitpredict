'use client';
// React Imports
import {useState} from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';

// Custom Components Imports
import GoalCard from '@/views/goals/GoalCard';
import {InfoDialog} from '@/components/InfoDialog';

// Type Imports
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

function DashboardPage() {
  const {goals} = useAuth();
  const [infoDialogProps, setInfoDialogProps] = useState<InfoDialogPropsType>({
    open: false,
  });
  return (
    <Grid container spacing={6} sx={{justifyContent: 'center'}}>
      <Grid item xs={12} sm={9} md={6} lg={4.5} xl={4}>
        <Grid container spacing={6}>
          {goals?.map(goal => (
            <Grid item xs={12} key={goal.id}>
              <GoalCard goal={goal} setInfoDialogProps={setInfoDialogProps} />
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
