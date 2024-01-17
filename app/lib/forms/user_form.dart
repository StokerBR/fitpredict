import 'package:fitpredict/enums/gender_enum.dart';
import 'package:fitpredict/widgets/input.dart';
import 'package:flutter/material.dart';

class UserForm {
  UserForm({
    required this.setState,
  }) : super() {
    // Inicializa a lista de itens do dropdown de gênero
    for (var gender in GenderEnum.values) {
      genderItems.add(
        DropdownMenuItem(
          value: gender.value,
          child: Text(gender.name),
        ),
      );
    }
  }

  final Function setState;

  bool autoValidate = false;

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController heightController = TextEditingController();
  final TextEditingController weightController = TextEditingController();

  String? genderValue;
  List<DropdownMenuItem<String?>> genderItems = [];

  Widget getForm() {
    return Form(
      key: formKey,
      child: Column(
        children: [
          CustomInput(
            controller: nameController,
            labelText: 'Nome',
            counterText: '',
            textCapitalization: TextCapitalization.words,
            maxLength: 50,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Insira seu nome';
              }
              return null;
            },
          ),
          const SizedBox(height: 20),
          DropdownButtonFormField<String?>(
            value: genderValue,
            decoration: const InputDecoration(
              labelText: 'Sexo',
            ),
            items: genderItems,
            onChanged: (value) {
              setState(() {
                genderValue = value;
              });
            },
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Selecione seu sexo';
              }
              return null;
            },
          ),
          const SizedBox(height: 20),
          CustomInput(
            controller: heightController,
            labelText: 'Altura (cm)',
            keyboardType: TextInputType.number,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Insira sua altura';
              } else {
                final height = int.tryParse(value);
                if (height == null || height <= 100 || height > 300) {
                  return 'Insira uma altura válida';
                }
              }
              return null;
            },
          ),
          const SizedBox(height: 20),
          CustomInput(
            controller: weightController,
            labelText: 'Peso (kg)',
            keyboardType: TextInputType.number,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Insira seu peso';
              } else {
                final weight = int.tryParse(value);
                if (weight == null || weight <= 30 || weight > 300) {
                  return 'Insira um peso válido';
                }
              }
              return null;
            },
          ),
        ],
      ),
    );
  }
}
