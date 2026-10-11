# Angela Roh · Cabelos & Arte

Site responsivo do salão em Carnaxide, Oeiras, com apresentação, cuidados capilares, prémios e certificados, fotografias, vídeo, localização e contacto pelo WhatsApp. Textos em português de Portugal.

**Site:** https://andrebilert.github.io/angela-roh-cabelos-arte/

## Estrutura

- `dist/index.html`: conteúdo, dados estruturados e metadados.
- `dist/styles.css`: apresentação e adaptação para celular, tablet e computador.
- `dist/app.js`: menu, carrossel de certificados, fotografias ampliadas e mensagem de marcação.
- `dist/assets/`: fotografias WebP, fontes locais, vídeo e ícone.
- `.github/workflows/pages.yml`: publicação automática no GitHub Pages.

## Atualizar

Edite os arquivos em `dist/` e envie as alterações para `main`. O GitHub Actions publica a nova versão automaticamente. O andamento aparece na aba **Actions** deste repositório.

O projeto é estático e não requer instalação de dependências nem compilação. Para visualizar localmente:

```shell
python -m http.server 8090 --directory dist
```

Abra http://localhost:8090.

## Conteúdo

A marcação é confirmada diretamente com o salão no WhatsApp. O formulário prepara a mensagem no navegador. Não existe armazenamento de respostas, sistema de pagamentos ou confirmação automática de reservas.

A fotografia principal de beleza e a fotografia do interior receberam tratamento com IA. A fotografia do interior teve o ventilador removido. Prémio e certificados usam as fotografias originais fornecidas, sem recriação de seus textos.

Esta é a versão de apresentação para revisão. Horários, lista completa de serviços, preços e domínio definitivo ainda precisam ser confirmados com o salão. O endereço de GitHub Pages é público.

Referência da configuração: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
