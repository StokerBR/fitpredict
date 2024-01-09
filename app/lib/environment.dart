import 'package:flutter/foundation.dart';

Map<String, dynamic> environment = {
  'url': kDebugMode
      ? 'http://localhost:3000' // Dev
      : 'https://api-prod.imobanco.com.br', // Prod
};
