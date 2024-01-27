'use client';
// React Imports
import React, {useState} from 'react';

// Next Imports
import Link from 'next/link';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import {styled, useTheme} from '@mui/material/styles';
import MuiCard, {CardProps} from '@mui/material/Card';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';

// Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// Form Imports
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

// Hooks Imports
import {useAuth} from '@/hooks/useAuth';

// Custom Components Imports
import {InfoDialog} from '@/components/InfoDialog';

// Types Imports
import {LoginParams} from '@/types/authContext';
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Utils Imports
import {getErrorDialogProps} from '@/components/InfoDialog';

// Styled Components
const Card = styled(MuiCard)<CardProps>(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: 450},
}));

function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [infoDialogProps, setInfoDialogProps] = useState<InfoDialogPropsType>({
    open: false,
  });

  // Hooks
  const theme = useTheme();
  const {login} = useAuth();

  const defaultValues: LoginParams = {
    email: '',
    password: '',
  };

  const schema = z.object({
    email: z.string().email('O e-mail informado é inválido.'),
    password: z.string().min(5, 'A senha deve ter no mínimo 5 caracteres'),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: LoginParams) {
    try {
      await login(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        setError('email', {
          type: 'manual',
          message: 'E-mail ou senha inválidos.',
        });
      } else {
        setInfoDialogProps(getErrorDialogProps(error));
      }
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(1),
        }}
      >
        <Card sx={{zIndex: 1}}>
          <CardContent
            sx={{p: theme => `${theme.spacing(13, 7, 6.5)} !important`}}
          >
            <Box
              sx={{
                mb: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={'/logo_horizontal.png'}
                width={280}
                height={70}
                priority
                alt={'Logo horizontal do sistema'}
              />
            </Box>

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{mb: 4}}>
                <Controller
                  name="email"
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur, name, ref}}) => (
                    <TextField
                      ref={ref}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      label={'E-mail'}
                      onChange={onChange}
                      placeholder={'E-mail'}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{color: 'error.main'}}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  error={Boolean(errors.password)}
                  htmlFor={'password_input'}
                >
                  Senha
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur, ref, name}}) => (
                    <OutlinedInput
                      ref={ref}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      label={'Senha'}
                      onChange={onChange}
                      id={'password_input'}
                      placeholder={'Senha'}
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{color: 'error.main'}} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              ></Box>
              <Button fullWidth size="large" type="submit" variant="contained">
                Entrar
              </Button>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{mr: 2, color: 'text.secondary'}}>
                  Novo por aqui?
                </Typography>

                <Link href="/register">
                  <Typography sx={{color: 'primary.main'}}>
                    Crie uma conta
                  </Typography>
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
        <InfoDialog
          open={infoDialogProps.open}
          text={infoDialogProps?.text}
          dialogType={infoDialogProps?.dialogType}
          toggle={() =>
            setInfoDialogProps(prevState => ({
              ...prevState,
              open: !prevState.open,
            }))
          }
        />
      </Box>
    </Box>
  );
}

export default LoginPage;
