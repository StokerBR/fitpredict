import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:fitpredict/enums/gender_enum.dart';
import 'package:fitpredict/functions/run_error_catch.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/input.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _passwordConfirmationController =
      TextEditingController();
  final TextEditingController _heightController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();

  bool autoValidate = false;

  String? _genderValue;
  List<DropdownMenuItem<String?>> genderItems = [];

  late User? _user;

  // Realiza o cadastro
  void _submit() async {
    setState(() {
      autoValidate = true;
    });

    if (_formKey.currentState!.validate()) {
      try {
        openLoading();

        var res = await HttpService.post(
          'user/register',
          {
            'name': _nameController.text,
            'gender': _genderValue,
            'height': int.parse(_heightController.text),
            'weight': int.parse(_weightController.text),
            'email': _emailController.text,
            'password': _passwordController.text,
          },
        );

        if (res.statusCode == 200 || res.statusCode == 201) {
          closeLoading();
          showSuccess('Cadastro realizado com sucesso!');
          if (context.mounted) {
            Navigator.pop(context);
          }
        }
      } catch (e) {
        closeLoading();
        runErrorCatch(
          e,
          'Erro ao realizar o cadastro. Tente novamente mais tarde.',
        );
      }

      _user = User(
        name: _nameController.text,
        email: _emailController.text,
        gender: _genderValue!,
        height: int.parse(_heightController.text),
        weight: int.parse(_weightController.text),
      );

      _user!.saveToBox();
    }
  }

  @override
  void initState() {
    // Inicializa a lista de itens do dropdown de gênero
    for (var gender in GenderEnum.values) {
      genderItems.add(
        DropdownMenuItem(
          value: gender.value,
          child: Text(gender.name),
        ),
      );
    }

    // Carrega os dados do usuário salvo
    _user = User.fromBox();

    // Preenche os campos do formulário com os dados do usuário
    if (_user != null) {
      _nameController.text = _user!.name;
      _emailController.text = _user!.email;
      _genderValue = _user!.gender;
      _heightController.text = _user!.height.toString();
      _weightController.text = _user!.weight.toString();
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Cadastro',
        ),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        behavior: HitTestBehavior.opaque,
        child: CustomScrollView(
          slivers: [
            SliverFillRemaining(
              hasScrollBody: false,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Form(
                      key: _formKey,
                      autovalidateMode: autoValidate
                          ? AutovalidateMode.always
                          : AutovalidateMode.disabled,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Dados pessoais:',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          TextFormField(
                            controller: _nameController,
                            decoration: const InputDecoration(
                              labelText: 'Nome',
                              counterText: "",
                            ),
                            textCapitalization: TextCapitalization.words,
                            maxLength: 50,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira seu nome';
                              }
                              return null;
                            },
                          ),
                          DropdownButtonFormField<String?>(
                            value: _genderValue,
                            decoration: const InputDecoration(
                              labelText: 'Gênero',
                            ),
                            items: genderItems,
                            onChanged: (value) {
                              setState(() {
                                _genderValue = value;
                              });
                            },
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Selecione seu gênero';
                              }
                              return null;
                            },
                          ),
                          TextFormField(
                            controller: _heightController,
                            decoration: const InputDecoration(
                              labelText: 'Altura (cm)',
                            ),
                            keyboardType: TextInputType.number,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira sua altura';
                              } else {
                                final height = int.tryParse(value);
                                if (height == null ||
                                    height <= 100 ||
                                    height > 300) {
                                  return 'Insira uma altura válida';
                                }
                              }
                              return null;
                            },
                          ),
                          TextFormField(
                            controller: _weightController,
                            decoration: const InputDecoration(
                              labelText: 'Peso (kg)',
                            ),
                            keyboardType: TextInputType.number,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira seu peso';
                              } else {
                                final weight = int.tryParse(value);
                                if (weight == null ||
                                    weight <= 30 ||
                                    weight > 300) {
                                  return 'Insira um peso válido';
                                }
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 40),
                          const Text(
                            'Dados de login:',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          TextFormField(
                            controller: _emailController,
                            decoration: const InputDecoration(
                              labelText: 'E-mail',
                              counterText: "",
                            ),
                            maxLength: 70,
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira seu e-mail';
                              } else if (!EmailValidator.validate(value)) {
                                return 'Insira um e-mail válido';
                              }
                              return null;
                            },
                          ),
                          CustomInput(
                            controller: _passwordController,
                            labelText: 'Senha',
                            hintText: 'Insira sua senha',
                            textCapitalization: TextCapitalization.none,
                            maxLength: 100,
                            obscureText: true,
                            passwordToggle: true,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira sua senha';
                              } else if (value.length < 6) {
                                return 'A senha deve ter pelo menos 6 caracteres';
                              }
                              return null;
                            },
                          ),
                          CustomInput(
                            controller: _passwordConfirmationController,
                            labelText: 'Confirmação da senha',
                            hintText: 'Confirme  sua senha',
                            textCapitalization: TextCapitalization.none,
                            maxLength: 100,
                            obscureText: true,
                            passwordToggle: true,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Insira sua senha';
                              } else if (value.length < 6) {
                                return 'A senha deve ter pelo menos 6 caracteres';
                              } else if (value != _passwordController.text) {
                                return 'As senhas não coincidem';
                              }
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                    const Expanded(
                      child: SizedBox(height: 40),
                    ),
                    ElevatedButton(
                      onPressed: _submit,
                      child: const Text('Salvar'),
                    ),
                    ValueListenableBuilder(
                      valueListenable: Hive.box<User>('user').listenable(),
                      builder: (context, value, child) {
                        _user = value.get('user');

                        if (_user == null) return Container();

                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 40),
                            const Text(
                              'Dados do usuário:',
                              style: TextStyle(
                                fontSize: 20,
                              ),
                            ),
                            const SizedBox(height: 20),
                            Text(
                              'Nome: ${_user!.name}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              'E-mail: ${_user!.email}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              'Sexo: ${GenderEnum.values.where((e) => e.value == _user!.gender).firstOrNull?.name ?? ''}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              'Altura: ${_user!.height}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              'Peso: ${_user!.weight}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
