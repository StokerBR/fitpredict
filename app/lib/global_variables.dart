import 'package:fitpredict/models/stat.dart';
import 'package:fitpredict/models/user.dart';
import 'package:fitpredict/services/pedometer_service.dart';
import 'package:flutter/material.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

DialogRoute? loadingRoute;

User? loggedUser;
Stat? currentStat;

PedometerService pedometerService = PedometerService();
