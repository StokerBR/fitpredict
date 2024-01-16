import 'package:flutter/foundation.dart';

Map<String, dynamic> environment = {
  'url': kDebugMode
      ? 'http://192.168.100.25:4000' // Dev
      : 'https://api-fitpredict.stokerbr.com', // Prod
};
