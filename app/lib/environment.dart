import 'package:flutter/foundation.dart';

Map<String, dynamic> environment = {
  'url': kDebugMode
      // ? 'http://192.168.100.25:4000' // Dev
      ? 'https://webapp.stokerbr.com' // Dev
      : 'https://api-fitpredict.stokerbr.com', // Prod
  // : 'http://192.168.15.2:4000', // Prod
};
