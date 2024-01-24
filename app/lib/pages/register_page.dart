import 'package:email_validator/email_validator.dart';
import 'package:fitpredict/forms/user_form.dart';
import 'package:fitpredict/functions/get_now_date.dart';
import 'package:fitpredict/functions/run_error_catch.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/pages/main_page.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/input.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late UserForm _userForm;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _passwordConfirmationController =
      TextEditingController();

  bool autoValidate = false;

  // Realiza o cadastro
  void _submit() async {
    setState(() {
      _userForm.autoValidate = true;
      autoValidate = true;
    });

    if (_userForm.formKey.currentState!.validate() &&
        _formKey.currentState!.validate()) {
      try {
        openLoading();

        Map<String, dynamic> userData = {
          'name': _userForm.nameController.text,
          'gender': _userForm.genderValue,
          'height': int.parse(_userForm.heightController.text),
          'weight': int.parse(_userForm.weightController.text),
          'email': _emailController.text,
          'password': _passwordController.text,
        };

        var res = await HttpService.post('user/register', userData);

        if (res.statusCode == 200 || res.statusCode == 201) {
          closeLoading();

          loggedUser = User(
            name: _userForm.nameController.text,
            email: _emailController.text,
            gender: _userForm.genderValue!,
            height: int.parse(_userForm.heightController.text),
            weight: int.parse(_userForm.weightController.text),
            lastSync: getNowDate(),
          );

          if (context.mounted) {
            Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                builder: (context) => const MainPage(),
              ),
              (route) => false,
            );
          }

          // TODO: Executar sincronização de dados aqui

          showSuccess('Cadastro realizado com sucesso!');
        }
      } catch (e) {
        closeLoading();
        runErrorCatch(
          e,
          'Erro ao realizar o cadastro. Tente novamente mais tarde.',
        );
      }
    }
  }

  @override
  void initState() {
    _userForm = UserForm(setState: setState);

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
                    const Text(
                      'Dados pessoais:',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 20),
                    _userForm.getForm(),
                    const SizedBox(height: 30),
                    const Text(
                      'Dados de login:',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Form(
                      key: _formKey,
                      autovalidateMode: autoValidate
                          ? AutovalidateMode.always
                          : AutovalidateMode.disabled,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CustomInput(
                            controller: _emailController,
                            labelText: 'E-mail',
                            maxLength: 70,
                            textCapitalization: TextCapitalization.none,
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
                          const SizedBox(height: 20),
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
                          const SizedBox(height: 20),
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
                      child: SizedBox(height: 30),
                    ),
                    ElevatedButton(
                      onPressed: _submit,
                      child: const Text('Salvar'),
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
