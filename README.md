# FitPredict

FitPredict é um aplicativo de condicionamento físico que permite aos usuários monitorar e melhorar seu bem-estar de maneira personalizada. Com o FitPredict, os usuários podem inserir e editar facilmente seus dados pessoais, como nome, sexo, altura e peso, para personalizar seu perfil de gêmeo digital. O aplicativo calcula metas de fitness com base nesses dados e permite que os usuários estabeleçam metas de distância, passos e calorias. Ele também integra funcionalidades de uma API, um dashboard web, login, e sincronização de dados. Além disso, os usuários podem acompanhar seu progresso em relação às metas estabelecidas, recebendo incentivos e dicas para manter o foco e a motivação em sua jornada de condicionamento físico.

## Casos de uso

### Funcionalidade: FC01 - Gerenciamento de Perfil do Gêmeo Digital

_Como usuário do FitPredict_

_Eu quero me cadastrar, fazer login, e inserir e editar meus dados pessoais e metas_

_Para personalizar o meu perfil do gêmeo digital e acompanhar meu progresso de condicionamento físico._

---

#### Caso de Uso: FC01a - Inserir Dados Pessoais

**Cenário: FC01a-C01 - Realizar Cadastro com Sucesso**

Dado que não estou cadastrado no FitPredict

E estou na tela de cadastro

Quando insiro meu nome, email, sexo, altura e peso, e uma senha

E aciono o botão de confirmação

Então os dados são salvos no meu perfil do gêmeo digital e sincronizados com a API do FitPredict

E o FitPredict calcula metas com base nos dados inseridos

---

**Cenário: FC01a-C02 - Cadastro com Dados Pessoais Inválidos**

Dado que estou logado no FitPredict

E estou na tela de cadastro

Quando insiro informações inválidas ou em branco

E aciono o botão de confirmação

Então o FitPredict exibe mensagens de erro apropriadas

E os dados não são salvos no meu perfil do gêmeo digital

---

#### Caso de Uso: FC01b - Login

**Cenário: FC03a-C01 - Realizar Login com Sucesso**

Dado que estou na tela de login do FitPredict

Quando insiro minhas credenciais, email e senha

E clico no botão de login

Então sou autenticado no FitPredict

E tenho acesso ao meu perfil e dados no aplicativo e no dashboard web

---

#### Caso de Uso: FC01c - Editar Dados Pessoais

**Cenário: FC01c-C01 - Editar Dados Pessoais com Sucesso**

Dado que estou logado no FitPredict

E estou na tela de perfil

Quando edito meu nome, sexo, altura e peso

E aciono o botão de confirmação

Então os dados são atualizados no meu perfil do gêmeo digital e sincronizados com a API do FitPredict

E o FitPredict recalcula as metas com base nos dados atualizados

---

#### Caso de Uso: FC01d - Inserir e Editar Metas

**Cenário: FC01d-C01 - Inserir Metas com Sucesso**

Dado que estou logado no FitPredict

E estou na tela de metas

Quando insiro metas de distância, passos e calorias

E aciono o botão de confirmação

Então as metas são salvas no meu perfil do gêmeo digital

---

**Cenário: FC01d-C02 - Editar Metas com Sucesso**

Dado que estou logado no FitPredict

E estou na tela de metas

Quando edito minhas metas de distância, passos e calorias

E aciono o botão de confirmação

Então as metas são atualizadas no meu perfil do gêmeo digital

---

#### Caso de Uso: FC01e - Sincronização de Dados

**Cenário: FC01e-C01 - Sincronizar Dados com Sucesso**

Dado que estou logado no FitPredict

E estou usando o aplicativo

Quando faço alterações nos meus dados pessoais, estatísticas ou metas

E clico o botão de sincronização

Então os dados são atualizados na api do FitPredict

---

### Funcionalidade: FC02 - Acompanhamento de Progresso

_Como usuário do FitPredict_

_Eu quero acompanhar meu progresso em relação às metas estabelecidas_

_Para manter o foco e motivação em minha jornada de condicionamento físico._

---

#### Caso de Uso: FC02a - Exibir Progresso

**Cenário: FC02a-C01 - Visualizar Progresso**

Dado que estou logado no FitPredict

Quando acesso a tela de progresso, no app ou no dashboard

Então o FitPredict exibe o meu progresso atual em relação às metas estabelecidas

E apresenta informações sobre passos andados, distância percorrida e calorias queimadas

---

**Cenário: FC02a-C02 - Alcançar Metas**

Dado que estou logado no FitPredict

E estou na tela de progresso, no app ou no dashboard

Quando atinjo as metas definidas de distância, passos e calorias

Então o FitPredict parabeniza e destaca o sucesso do usuário

---

**Cenário: FC02a-C03 - Não Alcançar Metas**

Dado que estou logado no FitPredict

E estou na tela de progresso, no app ou no dashboard

Quando não atinjo as metas definidas de distância, passos e calorias

Então o FitPredict fornece incentivo e sugestões para ajudar o usuário a se aproximar das metas
