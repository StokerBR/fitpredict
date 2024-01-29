// MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {DialogProps} from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

// Icons Imports
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
import CheckCircleOutline from 'mdi-material-ui/CheckCircleOutline';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';

type Props = DialogProps & {
  text?: string;
  title?: string;
  noIcon?: boolean;
  toggle: () => void;
  cancelBntText?: string;
  confirmBtnText?: string;
  refreshOnOpen?: boolean;
  handleConfirm?: () => void;
  handleRefresh?: () => void;
  dialogType: 'success' | 'error' | 'alert' | 'loading';
};
type GetErrorDialogPropsType = {
  error: any;
  errorType: 'error' | 'alert';
  replace?: (errorText: string) => string;
};

export type InfoDialogPropsType = {
  open: boolean;
  text?: string;
  title?: string;
  noIcon?: boolean;
  cancelBntText?: string;
  confirmBtnText?: string;
  handleConfirm?: () => void;
  handleRefresh?: () => void;
  dialogType?: 'success' | 'error' | 'alert' | 'loading';
};

export const InfoDialog = ({
  toggle,
  dialogType,
  title,
  text,
  cancelBntText,
  confirmBtnText,
  handleConfirm,
  handleRefresh,
  noIcon,
  ...rest
}: Props) => {
  function IconComponent({type}: {type: string}) {
    const fontSizeIcon = '6em';
    if (type === 'success') {
      return (
        <CheckCircleOutline
          style={{fontSize: fontSizeIcon}}
          color={'success'}
        />
      );
    } else if (type === 'error') {
      return (
        <CloseCircleOutline style={{fontSize: fontSizeIcon}} color={'error'} />
      );
    } else if (type === 'alert') {
      return (
        <AlertCircleOutline
          style={{fontSize: fontSizeIcon}}
          color={'warning'}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <Dialog
      onClose={
        !!handleRefresh
          ? () => {
              toggle();
              handleRefresh();
            }
          : () => {
              toggle();
            }
      }
      fullWidth
      maxWidth="xs"
      aria-labelledby="success-dialog"
      {...rest}
    >
      <DialogContent
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <IconComponent type={!noIcon ? dialogType : ''} />
        <Typography sx={{mt: 5, textAlign: 'center'}} variant="h5">
          {title ??
            (dialogType === 'success' ? 'Operação efetuada com sucesso.' : '')}
        </Typography>
        <Typography sx={{my: 5, textAlign: 'center'}}>{text ?? ''}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {dialogType === 'loading' && <CircularProgress sx={{mb: 5}} />}

        {dialogType != 'loading' && (
          <Button
            sx={{mr: 5}}
            variant={'outlined'}
            color={'secondary'}
            onClick={
              !!handleRefresh
                ? () => {
                    toggle();
                    handleRefresh();
                  }
                : () => {
                    toggle();
                  }
            }
          >
            {cancelBntText ?? (!!handleConfirm ? 'Cancelar' : 'Fechar')}
          </Button>
        )}
        {!!handleConfirm && (
          <Button
            variant={'contained'}
            onClick={
              !!handleConfirm
                ? () => {
                    handleConfirm();
                    toggle();
                  }
                : null
            }
          >
            {confirmBtnText ?? 'Confirmar'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export function getErrorDialogProps({
  error,
  errorType,
  replace = () => undefined,
}: GetErrorDialogPropsType): InfoDialogPropsType {
  if (error?.response?.status != 500 && !!error) {
    return {
      open: true,
      text:
        replace(error?.response?.data?.message ?? '') ??
        error?.response?.data?.message ??
        error.message,
      dialogType: !!errorType ? errorType : 'error',
    };
  } else {
    return {open: false};
  }
}
