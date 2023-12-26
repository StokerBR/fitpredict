# Arquitetura

## Arquitetura de Software

1. **Aplicativo Mobile**: Desenvolvido em Flutter, responsável pela interface do usuário, coleta e processamento de dados.
2. **API**: Construída com NestJS, gerencia a comunicação entre o aplicativo e o dashboard, e processa os dados enviados.
3. **Dashboard Web**: Implementado em ReactJS, permite visualização e gerenciamento dos dados e metas do usuário.

## Arquitetura de Sistema

- **Tecnologias Utilizadas**: Flutter (App), NestJS (API), ReactJS (Dashboard Web).
- **Implantação**: API e dashboard hospedados em um VPS na nuvem.
- **Comunicação**: Troca de informações entre app, API e web usando REST.

## Computação Ubíqua e Gêmeo Digital

- Uso de sensores do celular para coleta de dados e processamento na nuvem.
- Acesso contínuo em diferentes plataformas e dispositivos.
- Integração do conceito de gêmeo digital para personalização do perfil do usuário e sincronização com o servidor em nuvem.
