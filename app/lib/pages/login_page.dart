import 'package:fitpredict/pages/home_page.dart';
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

  void _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic>? result = await AuthService.login(
        _emailController.text,
        _passwordController.text,
      );

      if (result != null) {
        if (result['success']) {
          AuthService.saveUserLogin(
            _emailController.text,
            _passwordController.text,
          );

          if (context.mounted) {
            if (widget.redirectHome) {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => const HomePage(),
                ),
              );
            } else {
              Navigator.pop(context);
            }
          }

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
                  hintText: 'Insira seu email',
                  textCapitalization: TextCapitalization.none,
                  maxLength: 100,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Por favor, insira seu email';
                    }
                    return null;
                  },
                ),
                CustomInput(
                  controller: _passwordController,
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
                ValueListenableBuilder(
                  valueListenable: Hive.box<String>('token').listenable(),
                  builder: (context, value, child) {
                    final token = value.get('access_token');

                    if (token == null) return Container();

                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 40),
                        Text(
                          'Access Token: $token',
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
      ),
    );
  }
}
