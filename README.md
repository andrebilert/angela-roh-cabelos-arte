# Angela R.

Site responsivo da especialista em alisamentos em Carnaxide, Oeiras. Textos em português de Portugal, identidade em preto e dourado, marca AR, vídeo no hero, serviços, comparações de cabelo, prémios e formações, avaliações e contacto pelo WhatsApp.

**Site:** https://andrebilert.github.io/angela-roh-cabelos-arte/

## Estrutura

- `dist/index.html`: conteúdo, dados estruturados e metadados.
- `dist/*.css`: layout responsivo, identidade, tipografia, galeria e separação visual das seções.
- `dist/app.js`: menu, diálogos e preparação da mensagem de marcação.
- `dist/carousel.js`: carrossel contínuo de três prémios/formações, com setas externas e navegação por toque e teclado.
- `dist/hero-video.js`, `motion.js` e `sections.js`: vídeo, animações de entrada, divisórias e indicação da seção atual no menu.
- `dist/smooth-scroll.js` e `dist/vendor/`: rolagem suave no computador com Lenis local e respetiva licença.
- `dist/assets/`: imagens WebP, fontes locais, vídeo e ícones AR.
- `.github/workflows/pages.yml`: validação do JavaScript e publicação automática no GitHub Pages.

## Atualizar

Edite os arquivos em `dist/` e envie as alterações para `main`. O GitHub Actions publica a nova versão automaticamente. O andamento aparece na aba **Actions** deste repositório.

O projeto usa HTML, CSS e JavaScript e não exige compilação. Para visualizar localmente:

```shell
python -m http.server 8090 --directory dist
```

Abra http://localhost:8090.

## Conteúdo

Celulares recebem o mesmo conteúdo, vídeo, carrossel contínuo e transições entre seções, com composição adaptada e rolagem nativa por toque. A aceleração do carrossel ao passar o mouse aplica-se a dispositivos com mouse. A preferência de movimento reduzido desativa animações e reprodução automática; o conteúdo permanece acessível.

A marcação é confirmada diretamente com a Angela no WhatsApp. O formulário apenas prepara a mensagem no navegador. Não armazena respostas, processa pagamentos ou confirma reservas automaticamente.

O hero usa um recorte do vídeo fornecido pelo usuário. As comparações de cabelo receberam edição com IA e não preservam todos os detalhes das fotografias originais. As imagens dos prémios e certificados são apresentações gráficas recriadas a partir dos documentos fornecidos; não substituem os documentos oficiais.

O destaque de avaliações apresenta a nota 5,0 e o patamar de 116+ avaliações confirmado pelo usuário. Não há atualização automática. A avaliação de Eli Suarez foi transcrita da captura fornecida. Os outros dois excertos têm links para a fonte secundária consultada; não foram conferidos diretamente no Google.

O endereço do GitHub Pages é público. O domínio definitivo é uma configuração separada.

Referência da configuração: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
