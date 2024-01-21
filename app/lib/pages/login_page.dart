import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/pages/main_page.dart';
import 'package:fitpredict/services/auth_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({
    super.key,
    this.redirectHome = false,
  });

  final bool redirectHome;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String? passwordError;
  bool emailReadonly = false;

  void _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic>? result = await AuthService.login(
        _emailController.text,
        _passwordController.text,
      );

      if (result != null) {
        if (result['success']) {
          if (context.mounted) {
            if (widget.redirectHome) {
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                  builder: (context) => const MainPage(),
                ),
                (route) => false,
              );
            } else {
              Navigator.pop(context);
            }
          }

          // TODO: Executar sincronização de dados aqui

          showSuccess('Login realizado com sucesso!');
        } else {
          setState(() {
            passwordError = result['error'];
          });
        }
      }
    }
  }

  @override
  void initState() {
    User? user = User.fromBox();
    if (user != null) {
      _emailController.text = user.email;
      emailReadonly = true;
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Login',
        ),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        behavior: HitTestBehavior.opaque,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                CustomInput(
                  controller: _emailController,
                  labelText: 'Email',
                  hintText: 'Insira seu email',
                  textCapitalization: TextCapitalization.none,
                  keyboardType: TextInputType.emailAddress,
                  maxLength: 100,
                  readOnly: emailReadonly,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, insira seu email';
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
                  errorText: passwordError,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, insira sua senha';
                    }
                    passwordError = null;
                    return null;
                  },
                ),
                const Expanded(
                  child: SizedBox(height: 20),
                ),
                ElevatedButton(
                  onPressed: _handleLogin,
                  child: const Text('Entrar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
