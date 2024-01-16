import 'package:dio/dio.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/services/user_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthService {
  // Realiza o login do usuário
  static Future<Map<String, dynamic>?>? login(
      String email, String password) async {
    if (email.isNotEmpty && password.isNotEmpty) {
      Map<String, dynamic> params = {
        'email': email,
        'password': password,
      };

      Response res;

      try {
        openLoading();

        res = await HttpService.post('auth/login/', params);

        if (res.statusCode == 200 && res.data != "") {
          Map<String, dynamic> data = res.data;

          var tokenBox = Hive.box<String>('token');

          tokenBox.put('access_token', data['access_token']);
          tokenBox.put('refresh_token', data['refresh_token']);

          Map<String, dynamic>? user = await UserService.getUser();

          closeLoading();

          if (user != null) {
            return {
              'success': true,
              'user': user,
            };
          }
        }
      } catch (e) {
        closeLoading();

        String message = 'Falha ao realizar login. Tente novamente mais tarde.';

        if (e is DioException) {
          if (e.response != null && e.response!.statusCode == 401) {
            return {
              'success': false,
              'error': 'Email e/ou senha incorretoes',
            };
          } /*  else {
            return {
              'success': false,
              'error': 'Falha ao realizar login.',
            };
          } */
        } else {
          message = e.toString();
        }

        showError(message);
      }
    } else {
      ScaffoldMessenger.of(navigatorKey.currentContext!).showSnackBar(
        const SnackBar(
          content: Text('Preencha o Email e a Senha'),
          backgroundColor: Colors.red,
          duration: Duration(seconds: 1),
        ),
      );
    }

    return null;
  }

  // Salva o login usuário
  static void saveUserLogin(String email, String password) {
    var userLoginBox = Hive.box<String>('userLogin');

    userLoginBox.put('email', email);
    userLoginBox.put('password', password);
  }

  // Obtém o login do usuário
  static Map<String, dynamic>? getUserLogin() {
    var userLoginBox = Hive.box<String>('userLogin');

    if (userLoginBox.isNotEmpty) {
      return {
        'email': userLoginBox.get('email'),
        'password': userLoginBox.get('password'),
      };
    } else {
      return null;
    }
  }

  // Limpa o login do usuário
  static void clearUserLogin() {
    var userLoginBox = Hive.box<String>('userLogin');
    userLoginBox.clear();
  }

  // Remove o usuário do storage
  static void logout([bool clearUser = false, bool redirect = true]) {
    Box tokenBox = Hive.box<String>('token');
    Box userBox = Hive.box<User>('user');
    tokenBox.clear();
    userBox.clear();
    if (clearUser) {
      clearUserLogin();
    }
    if (redirect) {
      redirectLogin();
    }
  }

  // Redireciona para a pagina de login
  static void redirectLogin() {
    BuildContext? context = navigatorKey.currentContext;
    if (context != null) {
      // Adiciona a pagina de login na stack
      /* Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => LoginPage(),
        ),
      ); */
    }
  }

  // Atualiza o token
  static Future<String?> refreshToken() async {
    var tokenBox = Hive.box<String>('token');

    String refreshToken = tokenBox.get('refresh_token') ?? '';

    Map<String, dynamic> params = {
      'refresh': refreshToken,
    };

    Response? res;

    try {
      res = await HttpService.post('auth/refresh', params);
    } catch (e) {
      // print(e);
    }

    if (res != null) {
      if (res.statusCode == 200) {
        Map<String, dynamic> data = res.data;

        tokenBox.put('access_token', data['access']);
        tokenBox.put('refresh_token', data['refresh_token']);

        return data['access'];
      }
    }

    return null;
  }

  static bool isAuthenticated() {
    String? token = Hive.box<String>('token').get('access_token');

    return token != null && !JwtDecoder.isExpired(token);
  }
}
