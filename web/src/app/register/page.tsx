'use client';
// React Imports
import React, {useState} from 'react';

// Next Imports
import Link from 'next/link';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import {Gender} from '@/types/user';
import {RegisterParams} from '@/types/authContext';
import {InfoDialogPropsType} from '@/components/InfoDialog';

// Utils Imports
import {getErrorDialogProps} from '@/components/InfoDialog';

// Styled Components
const Card = styled(MuiCard)<CardProps>(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: 450},
}));

type FormValues = RegisterParams & {
  confirmPassword: string;
};

function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [infoDialogProps, setInfoDialogProps] = useState<InfoDialogPropsType>({
    open: false,
  });

  // Hooks
  const theme = useTheme();
  const {register, login} = useAuth();

  const defaultValues: FormValues = {
    name: undefined,
    email: undefined,
    gender: undefined,
    password: undefined,
    height: undefined,
    weight: undefined,
    confirmPassword: undefined,
  };

  const schema = z
    .object({
      name: z
        .string({required_error: 'O preenchimento do campo é obrigatório.'})
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
      email: z
        .string({required_error: 'O preenchimento do campo é obrigatório.'})
        .email('O e-mail informado é inválido.'),
      gender: z.nativeEnum(Gender, {
        required_error: 'O preenchimento do campo é obrigatório.',
      }),
      password: z
        .string({
          required_error: 'O preenchimento do campo é obrigatório.',
        })
        .min(5, 'A senha deve ter no mínimo 5 caracteres'),
      height: z.coerce
        .number({
          required_error: 'O preenchimento do campo é obrigatório.',
          invalid_type_error: 'O preenchimento do campo é obrigatório.',
        })
        .gt(0, 'O numero deve ser maior que 0.'),
      weight: z.coerce
        .number({
          required_error: 'O preenchimento do campo é obrigatório.',
          invalid_type_error: 'O preenchimento do campo é obrigatório.',
        })
        .gt(0, 'O numero deve ser maior que 0.'),
      confirmPassword: z.string({
        required_error: 'O preenchimento do campo é obrigatório.',
      }),
    })
    .refine(data => data?.password === data?.confirmPassword, {
      message: 'As senhas devem ser iguais',
      path: ['confirmPassword'],
    });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    try {
      const {confirmPassword, ...params} = data;
      await register(params);
      await login({email: params.email, password: params.password});
    } catch (error) {
      setInfoDialogProps(getErrorDialogProps(error));
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h6">Dados pessoais</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="name"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, name, ref},
                      }) => (
                        <TextField
                          ref={ref}
                          name={name}
                          label={'Nome*'}
                          onBlur={onBlur}
                          value={value ?? ''}
                          onChange={onChange}
                          placeholder={'Nome*'}
                          error={Boolean(errors.name)}
                        />
                      )}
                    />
                    {errors.name && (
                      <FormHelperText sx={{color: 'error.main'}}>
                        {errors.name.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      error={Boolean(errors.gender)}
                      htmlFor={'gender_input'}
                    >
                      Sexo*
                    </InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, name, ref},
                      }) => (
                        <Select
                          ref={ref}
                          name={name}
                          label={'Sexo*'}
                          onBlur={onBlur}
                          id={'gender_input'}
                          value={value ?? ''}
                          onChange={onChange}
                          placeholder={'Sexo*'}
                          error={Boolean(errors.gender)}
                        >
                          <MenuItem value={'M'}>Masculino</MenuItem>
                          <MenuItem value={'F'}>Feminino</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <FormHelperText sx={{color: 'error.main'}}>
                        {errors.gender.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="height"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, name, ref},
                      }) => (
                        <TextField
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          type={'number'}
                          value={value ?? ''}
                          onChange={onChange}
                          label={'Altura (cm)*'}
                          placeholder={'Altura (cm)*'}
                          error={Boolean(errors.height)}
                        />
                      )}
                    />
                    {errors.height && (
                      <FormHelperText sx={{color: 'error.main'}}>
                        {errors.height.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="weight"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, name, ref},
                      }) => (
                        <TextField
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          type={'number'}
                          value={value ?? ''}
                          onChange={onChange}
                          label={'Peso (kg)*'}
                          placeholder={'Peso (kg)*'}
                          error={Boolean(errors.weight)}
                        />
                      )}
                    />
                    {errors.weight && (
                      <FormHelperText sx={{color: 'error.main'}}>
                        {errors.weight.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Dados de login</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="email"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, name, ref},
                      }) => (
                        <TextField
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          label={'E-mail*'}
                          value={value ?? ''}
                          onChange={onChange}
                          placeholder={'E-mail*'}
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      error={Boolean(errors.password)}
                      htmlFor={'password_input'}
                    >
                      Senha*
                    </InputLabel>
                    <Controller
                      name="password"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, ref, name},
                      }) => (
                        <OutlinedInput
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          label={'Senha*'}
                          value={value ?? ''}
                          onChange={onChange}
                          id={'password_input'}
                          placeholder={'Senha*'}
                          error={Boolean(errors.password)}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOutline />
                                ) : (
                                  <EyeOffOutline />
                                )}
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      error={Boolean(errors.confirmPassword)}
                      htmlFor={'confirm_password_input'}
                    >
                      Confirmação de senha*
                    </InputLabel>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{required: true}}
                      render={({
                        field: {value, onChange, onBlur, ref, name},
                      }) => (
                        <OutlinedInput
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          value={value ?? ''}
                          onChange={onChange}
                          id={'confirm_password_input'}
                          label={'Confirmação de senha*'}
                          error={Boolean(errors.confirmPassword)}
                          placeholder={'Confirmação de senha*'}
                          type={showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={e => e.preventDefault()}
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOutline />
                                ) : (
                                  <EyeOffOutline />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <FormHelperText sx={{color: 'error.main'}} id="">
                        {errors.confirmPassword.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    className="rounded-lg"
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
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

export default RegisterPage;
