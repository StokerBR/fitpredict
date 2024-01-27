import 'package:fitpredict/forms/user_form.dart';
import 'package:fitpredict/functions/run_error_catch.dart';
import 'package:fitpredict/global_variables.dart';
import 'package:fitpredict/services/http_service.dart';
import 'package:fitpredict/widgets/alert.dart';
import 'package:fitpredict/widgets/loading.dart';
import 'package:flutter/material.dart';

class UserPage extends StatefulWidget {
  const UserPage({super.key});

  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  late UserForm _userForm;

  // Atualiza os dados do usuário
  void _submit() async {
    setState(() {
      _userForm.autoValidate = true;
    });

    if (_userForm.formKey.currentState!.validate()) {
      try {
        openLoading();

        Map<String, dynamic> userData = {
          'name': _userForm.nameController.text,
          'gender': _userForm.genderValue,
          'height': int.parse(_userForm.heightController.text),
          'weight': int.parse(_userForm.weightController.text),
          'totalSteps': loggedUser!.totalSteps,
        };

        var res = await HttpService.put('user', userData);

        if (res.statusCode == 200 || res.statusCode == 201) {
          closeLoading();

          loggedUser!.name = _userForm.nameController.text;
          loggedUser!.gender = _userForm.genderValue!;
          loggedUser!.height = int.parse(_userForm.heightController.text);
          loggedUser!.weight = int.parse(_userForm.weightController.text);

          loggedUser!.saveToBox();

          showSuccess('Dados pessoais atualizados com sucesso!');
        }
      } catch (e) {
        closeLoading();
        runErrorCatch(
          e,
          'Erro ao realizar o cadastro. Tente novamente mais tarde.',
        );
      }
    }
  }

  @override
  void initState() {
    _userForm = UserForm(setState: setState);

    _userForm.nameController.text = loggedUser!.name;
    _userForm.genderValue = loggedUser!.gender;
    _userForm.heightController.text = loggedUser!.height.toString();
    _userForm.weightController.text = loggedUser!.weight.toString();

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Dados pessoais',
        ),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        behavior: HitTestBehavior.opaque,
        child: CustomScrollView(
          slivers: [
            SliverFillRemaining(
              hasScrollBody: false,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _userForm.getForm(),
                    const Expanded(
                      child: SizedBox(height: 30),
                    ),
                    ElevatedButton(
                      onPressed: _submit,
                      child: const Text('Salvar'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
