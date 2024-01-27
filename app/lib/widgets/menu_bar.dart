import 'package:fitpredict/theme.dart';
import 'package:flutter/material.dart';

class CustomMenuBar extends StatelessWidget {
  const CustomMenuBar({
    super.key,
    this.icon,
    this.iconWidget,
    required this.name,
    required this.action,
    this.rightWidget,
  });

  final IconData? icon;
  final Widget? iconWidget;
  final String name;
  final Function action;
  final Widget? rightWidget;

  @override
  Widget build(BuildContext context) {
    return Material(
      child: InkWell(
        onTap: () {
          action();
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 2),
          child: Container(
            width: double.infinity,
            height: 60,
            decoration: const BoxDecoration(),
            child: Row(
              children: [
                iconWidget ??
                    Icon(
                      icon,
                      size: 24,
                      color: AppColors.primary,
                    ),
                const SizedBox(width: 10),
                Expanded(
                  flex: 1,
                  child: Text(
                    name,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                rightWidget ??
                    Icon(
                      Icons.keyboard_arrow_right_rounded,
                      size: 20,
                      color: AppColors.primary,
                    ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
