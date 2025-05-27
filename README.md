
# Beatree Backend

## Descrição
O Beatree é um projeto de streaming de música com foco no gerenciamento de playlists. O beatree-backend é o back do projeto Beatree, necessário pra trazer os dados à aplicação.

## Índice
- [Recursos e Funcionalidades](#recursos-e-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Contribuir](#como-contribuir)

## Recursos e Funcionalidades
- Endpoints de musicas e playlists,
- Testes automatizados.
- Git flow.

## Tecnologias Utilizadas
TypeScript, NestJS, Jest, Mongo

## Instalação e Configuração
```bash
WEB
git clone https://github.com/Solrighi/beatree-back.git)
cd beatree-back
npm install
npm run start:dev

DOCKER
git clone https://github.com/Solrighi/beatree-back.git)
cd beatree-back
npm install
docker build -t beatree-back .
>docker run -p 3000:3000 beatree-back

RODAR TESTES
npm run test
```

## Como Contribuir
1. Faça um fork do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/nome-da-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

Colaboradores: 
Dev:
[Solange Righi](https://www.linkedin.com/in/solange-righi/)
