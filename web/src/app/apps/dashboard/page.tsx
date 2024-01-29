'use client';
//React Imports
import {useState} from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';

// Custom Components Imports
import {InfoDialog} from '@/components/InfoDialog';
import TodayStepsCard from '@/views/dashboard/TodayStepsCard';
import TotalStepsCard from '@/views/dashboard/TotalStepsCard';

// Type Imports
import {InfoDialogPropsType} from '@/components/InfoDialog';

function DashboardPage() {
  const [infoDialogProps, setInfoDialogProps] = useState<InfoDialogPropsType>({
    open: false,
  });
  return (
    <Grid container spacing={6} sx={{justifyContent: 'center'}}>
      <Grid item xs={12} sm={6} md={4.5} lg={3.5} xl={3}>
        <TodayStepsCard setInfoDialogProps={setInfoDialogProps} />
      </Grid>
      <Grid item xs={12} sm={6} md={4.5} lg={3.5} xl={3}>
        <TotalStepsCard />
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
