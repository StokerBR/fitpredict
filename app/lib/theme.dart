import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get themeData {
    return ThemeData(
      useMaterial3: true,
      // colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
      colorScheme: ColorScheme(
        primary: AppColors.primary,
        secondary: AppColors.blue[600]!,
        surface: Colors.white,
        background: Colors.white,
        error: Colors.red[600]!,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: AppColors.blue[950]!,
        onBackground: AppColors.primary,
        onError: Colors.white,
        brightness: Brightness.light,
      ),

      // Transições de página
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),

      // Tema do AppBar
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        titleTextStyle: const TextStyle(
          // color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.w500,
        ),
      ),

      // ElevatedButton
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          disabledBackgroundColor: AppColors.blue[900]!,
          disabledForegroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 0,
          shadowColor: Colors.transparent,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.all(20),
          minimumSize: const Size.fromHeight(40),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}

// classe para substituir Colors
class AppColors {
  static Color primary = AppColors.blue;

  static MaterialColor get blue => const MaterialColor(
        0xFF003C80,
        <int, Color>{
          600: Color(0xFF0075FF),
          700: Color(0xFF0066E6),
          800: Color(0xFF003C80),
          900: Color(0xFF001E40),
          950: Color(0xFF001329),
        },
      );
}
