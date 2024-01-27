import 'package:dio/dio.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:hive/hive.dart';

class UserService {
  // Obtém os dados do usuário e salva
  static Future<User?> getUser() async {
    var tokenBox = Hive.box<String>('token');

    if ((tokenBox.get('access_token') ?? '').isNotEmpty) {
      Response? res;
      try {
        res = await HttpService.get('user');
      } catch (e) {
        showError('Falha ao obter usuário');
      }

      if (res != null) {
        if (res.statusCode == 200) {
          User user = User.fromMap(res.data);
          user.saveToBox();

          return user;
        } else {
          return null;
        }
      }
    }

    return null;
  }
}
