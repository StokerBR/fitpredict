import 'package:fitpredict/global_variables.dart';
import 'package:flutter/material.dart';

Future<T?> showCustomDialog<T>({
  required Widget content,
  Color? barrierColor,
  bool barrierDismissible = true,
  bool closeButon = true,
  bool canPop = true,
}) {
  return showDialog<T?>(
      context: navigatorKey.currentContext!,
      barrierColor: barrierColor ?? Colors.black.withOpacity(0.35),
      barrierDismissible: barrierDismissible,
      builder: (context) {
        return WillPopScope(
          onWillPop: () async => canPop,
          child: Dialog(
            insetPadding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Stack(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(25),
                      child: content,
                    ),
                    closeButon
                        ? Align(
                            alignment: Alignment.topRight,
                            child: GestureDetector(
                              behavior: HitTestBehavior.opaque,
                              onTap: () {
                                Navigator.pop(context);
                              },
                              child: Padding(
                                padding: const EdgeInsets.only(
                                  top: 25,
                                  right: 25,
                                  bottom: 25,
                                  left: 25,
                                ),
                                child: Icon(
                                  Icons.close,
                                  size: 16,
                                  color: Colors.grey[600],
                                ),
                              ),
                            ),
                          )
                        : Container(),
                  ],
                ),
              ],
            ),
          ),
        );
      });
}
