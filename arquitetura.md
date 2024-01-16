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

## Atributos de Qualidade Prioritários

1. **Funcionalidade**: Dada a natureza do FitPredict, a precisão e a funcionalidade correta são cruciais. Métricas: cobertura de testes dos casos de uso, precisão das funcionalidades de monitoramento de fitness.

2. **Usabilidade**: Essencial para a experiência do usuário, especialmente em aplicativos de condicionamento físico. Métricas: pesquisas de satisfação do usuário, testes de usabilidade, taxa de retenção de usuários.

3. **Eficiência**: Importante para o desempenho e economia de recursos, crucial em dispositivos móveis. Métricas: tempo de resposta da API, uso de recursos do aplicativo e do dashboard.
