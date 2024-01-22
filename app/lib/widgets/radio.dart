import 'package:flutter/material.dart';

class CustomRadio extends StatefulWidget {
  const CustomRadio({
    super.key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.labelText,
    this.labelString,
  });

  final dynamic value;
  final dynamic groupValue;
  final void Function(dynamic)? onChanged;
  final Text? labelText;
  final String? labelString;

  @override
  State<CustomRadio> createState() => _CustomRadioState();
}

class _CustomRadioState extends State<CustomRadio> {
  onTap() {
    setState(() {
      if (widget.onChanged != null) widget.onChanged!(widget.value!);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          height: 20,
          width: 20,
          child: Radio(
            value: widget.value,
            groupValue: widget.groupValue,
            onChanged: widget.onChanged,
          ),
        ),
        GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.all(10.0),
            child: widget.labelString != null
                ? Text(
                    widget.labelString!,
                    style: const TextStyle(fontSize: 14),
                  )
                : widget.labelText,
          ),
        ),
      ],
    );
  }
}
