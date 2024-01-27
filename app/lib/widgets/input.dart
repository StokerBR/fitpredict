import 'package:fitpredict/widgets/input_label.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomInput extends StatefulWidget {
  const CustomInput({
    super.key,
    this.label,
    this.labelText,
    this.hintText,
    this.errorText,
    this.suffixIcon,
    this.prefixIcon,
    this.suffix,
    this.prefix,
    this.textInputAction,
    this.onFieldSubmitted,
    this.keyboardType,
    this.controller,
    this.validator,
    this.maxLength,
    this.counterText = '',
    this.readOnly = false,
    this.obscureText,
    this.passwordToggle,
    this.enableSuggestions = true,
    this.autocorrect = true,
    this.inputFormatters,
    this.maxLines = 1,
    this.focusNode,
    this.decoration,
    this.onChanged,
    this.scrollPadding = const EdgeInsets.all(0),
    this.textCapitalization,
  });

  final String? label;
  final String? hintText;
  final String? labelText;
  final String? errorText;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final Widget? suffix;
  final Widget? prefix;
  final TextInputAction? textInputAction;
  final Function(String)? onFieldSubmitted;
  final TextInputType? keyboardType;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final int? maxLength;
  final String? counterText;
  final bool readOnly;
  final bool? obscureText;
  final bool? passwordToggle;
  final bool enableSuggestions;
  final bool autocorrect;
  final List<TextInputFormatter>? inputFormatters;
  final int? maxLines;
  final FocusNode? focusNode;
  final InputDecoration? decoration;
  final Function(String)? onChanged;
  final EdgeInsets scrollPadding;
  final TextCapitalization? textCapitalization;

  @override
  State<CustomInput> createState() => _CustomInputState();
}

class _CustomInputState extends State<CustomInput> {
  bool? passwordHidden;

  @override
  void initState() {
    super.initState();
    passwordHidden = widget.obscureText ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        widget.label != null
            ? Column(
                children: [
                  InputLabel(widget.label!),
                  const SizedBox(height: 10),
                ],
              )
            : const SizedBox(),
        TextFormField(
          decoration: widget.decoration ??
              InputDecoration(
                labelText: widget.labelText,
                hintText: widget.hintText,
                errorText: widget.errorText,
                counterText: widget.counterText,
                suffixIcon: widget.suffixIcon ??
                    (widget.passwordToggle ?? false
                        ? GestureDetector(
                            onTap: () {
                              setState(() {
                                passwordHidden = !passwordHidden!;
                              });
                            },
                            child: Icon(
                              passwordHidden ?? false
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Colors.grey[600],
                            ),
                          )
                        : null),
                prefixIcon: widget.prefixIcon,
                suffix: widget.suffix,
                prefix: widget.prefix,
              ),
          textCapitalization:
              widget.textCapitalization ?? TextCapitalization.words,
          textInputAction: widget.textInputAction,
          onFieldSubmitted: widget.onFieldSubmitted,
          keyboardType: widget.keyboardType,
          controller: widget.controller,
          validator: widget.validator,
          maxLength: widget.maxLength,
          readOnly: widget.readOnly,
          obscureText: passwordHidden!,
          enableSuggestions: widget.enableSuggestions,
          autocorrect: widget.autocorrect,
          inputFormatters: widget.inputFormatters,
          maxLines: widget.maxLines,
          focusNode: widget.focusNode,
          onChanged: widget.onChanged,
          scrollPadding: widget.scrollPadding,
        ),
      ],
    );
  }
}
