# App

Fit Fusion

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível ver o perfil de um usuário logado (foto de perfil, email, nome, sobrenome);
- [X] Deve ser possível cadastrar dias da semana;
- [X] Deve ser possível cadastrar tipos de treino;
- [X] Deve ser possível cadastrar exercicios;
- [X] Deve ser possível cadastrar exercícios para um determinado usuário;
- [X] Deve ser possível listar os treinos de um deteminado usuário pelo dia da semana;
- [X] Deve ser possível realizar check-in em treino diários;
- [X] Deve ser possível listar histórico de usuário agrupado por dia;
- [X] Deve ser possível atualizar foto de perfil, nome e senha;

## RNs (Regras de negócio)

- [X] Usuário não pode realizar cadastro com e-mail duplicado;
- [X] Usuário não pode realizar cadastro com telefone duplicado;
- [X] Os dias da semana só podem ser registrado por AMDs;
- [X] Os tipos de treino só podem ser registrado por AMDs;
- [X] Os exercicios só podem ser registrado por AMDs;
- [X] Usuário só pode visualizar seus treinos estando autenticado;
- [] Usuário só pode visualizar seu histórico estando autenticado;
- [] Usuário só pode realizar o check-in do treino estando autenticado;
- [] Usuário só pode realizar o a atualização de dados do perfil estando autenticado;

## RNFs (Requisitos não funcionais)

- [X] A senha do usuário deve estar criptografada;
- [X] Os dados deve ser persistidos em um banco POSTGRESQL;
- [X] A autenticação deve ser realizada através do JWT(JSON Web Token);
- [X] As fotos de perfil dos usuários devem ser armazenadas localmente(servidor);
- [X] As capas e gifs do treino devem ser armazenadas localment(servidor)
