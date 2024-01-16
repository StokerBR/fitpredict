import 'package:dio/dio.dart';
import 'package:fitpredict/environment.dart';
import 'package:fitpredict/services/auth_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:hive/hive.dart';

class HttpService {
  /// Obtém a url
  static String siteUrl(String path) {
    if (path[0] == '/') {
      path = path.substring(1);
    }

    return environment['url'] + '/' + path;
  }

  /// Obtém os headers para a requizição
  static Map<String, dynamic> getHeaders(
      [Map<String, dynamic> headers = const {}, bool replace = false]) {
    Map<String, dynamic> defaultHeaders = {
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    var tokenBox = Hive.box<String>('token');
    String token = tokenBox.get('access_token') ?? '';

    if (token.isNotEmpty) {
      defaultHeaders["Authorization"] = 'Bearer $token';
    }

    if (headers.isNotEmpty) {
      if (replace) {
        defaultHeaders = {...headers, ...defaultHeaders};
      } else {
        defaultHeaders = {...defaultHeaders, ...headers};
      }
    }

    return defaultHeaders;
  }

  /// Realiza a requizição novamente
  static Future<Response> retryRequest(RequestOptions requestOptions) async {
    final options = Options(
      method: requestOptions.method,
      headers: getHeaders(requestOptions.headers, true),
    );

    return Dio().request<dynamic>(
      requestOptions.path,
      data: requestOptions.data,
      queryParameters: requestOptions.queryParameters,
      options: options,
    );
  }

  /// Realiza a requisição
  static Future<Response> doRequest(String method, String path,
      {Object? data = const {},
      Map<String, dynamic> headers = const {}}) async {
    Dio dio = Dio();

    headers = getHeaders(headers);

    // Adicionar interceptor para atualizar o token caso esteja expirado
    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (DioException err, handler) async {
          bool isLogin = err.requestOptions.path.endsWith('auth/login/');

          if (err.response?.statusCode == 401 && !isLogin) {
            var retryCount = err.requestOptions.headers['retryCount'] ?? 0;
            if (retryCount < 1) {
              try {
                // Tenta atualizar o token e refazer a requizição
                // err.requestOptions.data['retryCount'] = 1;
                err.requestOptions.headers
                    .addEntries({'retryCount': 1}.entries);

                final token = await AuthService.refreshToken();
                if (token != null) {
                  err.requestOptions.headers
                      .update('Authorization', (value) => 'Bearer $token');
                }

                return handler.resolve(await retryRequest(err.requestOptions));
              } catch (e) {
                AuthService.logout();
              }
            } else {
              AuthService.logout();
            }
          }
          return handler.next(err);
        },
      ),
    );

    var url = siteUrl(path);

    return dio
        .request(
      url,
      data: data,
      options: Options(
        method: method,
        headers: headers,
      ),
    )
        .timeout(
      const Duration(seconds: 60),
      onTimeout: () {
        showError(
            'Erro de conexão com o servidor. Tente novamente mais tarde.');
        return Future.error('Erro de conexão com o servidor.');
      },
    );
  }

  /// Realiza uma requizição GET
  static Future<Response> get(String path,
      [Map<String, String> headers = const {}]) async {
    return doRequest('get', path, headers: headers);
  }

  // Realiza uma requizição POST
  static Future<Response> post(String path, Object data,
      [Map<String, String> headers = const {}]) {
    return doRequest('post', path, data: data, headers: headers);
  }

  // Realiza uma requizição PUT
  static Future<Response> put(String path, Map data,
      [Map<String, String> headers = const {}]) async {
    return doRequest('put', path, data: data, headers: headers);
  }

  // Realiza uma requizição PATCH
  static Future<Response> patch(String path, Map data,
      [Map<String, String> headers = const {}]) async {
    return doRequest('patch', path, data: data, headers: headers);
  }

  // Realiza uma requizição DELETE
  static Future<Response> delete(String path,
      [Map data = const {}, Map<String, String> headers = const {}]) async {
    return doRequest('delete', path, data: data, headers: headers);
  }
}
