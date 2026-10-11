# Angela R.

Site responsivo da especialista em alisamentos em Carnaxide, Oeiras. Textos em português de Portugal, identidade em preto e dourado, marca AR, vídeo no hero, serviços, fotografias reais dos trabalhos, prémios e formações, avaliações e contacto pelo WhatsApp.

**Site:** https://andrebilert.github.io/angela-roh-cabelos-arte/

## Estrutura

- `dist/index.html`: conteúdo, dados estruturados e metadados.
- `dist/robots.txt` e `dist/sitemap.xml`: rastreamento e endereço público da página.
- `SEO.md`: ajustes de busca local e próximos passos no Google Business Profile e Search Console.
- `dist/*.css`: layout responsivo, identidade, tipografia, galeria e separação visual das seções.
- `dist/app.js`: menu, diálogos e preparação da mensagem de marcação.
- `dist/carousel.js`: carrossel contínuo de três prémios/formações, com setas externas e navegação por toque e teclado.
- `dist/results.js` e `dist/results.css`: galeria compacta das sete imagens de trabalhos escolhidas pelo usuário, com navegação por setas, toque e teclado, sem ampliação.
- `dist/hero-video.js`, `motion.js` e `sections.js`: vídeo, animações de entrada, divisórias e indicação da seção atual no menu.
- `dist/faq.js`: perguntas com abertura e fecho suaves, interrupção de animações ao clicar rapidamente, teclado e apenas uma resposta expandida.
- `dist/mobile-booking.js`: barra de contacto no celular, apresentada depois do botão principal e com espaço inferior medido automaticamente.
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

Celulares recebem o mesmo conteúdo, vídeo, carrossel contínuo e transições entre seções, com composição adaptada e rolagem nativa por toque. No computador, a rodinha do mouse tem desaceleração suave e os links do menu percorrem a página em 1,25 segundo. A aceleração do carrossel ao passar o mouse aplica-se a dispositivos com mouse. A preferência de movimento reduzido desativa animações e reprodução automática; o conteúdo permanece acessível.

A barra móvel “O seu liso começa aqui” aparece apenas depois que o botão principal do hero passa acima do cabeçalho. Ao voltar ao início, ela desaparece. O espaço inferior acompanha a altura real da barra, incluindo a área segura do dispositivo, para permitir acesso ao fim da página. Sem JavaScript, os contactos do cabeçalho, hero e restante conteúdo continuam disponíveis.

“Morenas e louras iluminadas” tem cartão próprio entre os três cuidados principais, sem repetição na lista de outros serviços. A apresentação profissional usa “especialista em alisamento”. A revisão de português de Portugal inclui “madeixas”, “louro/louras”, “historial”, “contacto”, “marcação” e “maquilhagem”; nomes dos certificados e relatos das clientes mantêm a sua origem.

A marcação é confirmada diretamente com a Angela no WhatsApp. O formulário apenas prepara a mensagem no navegador. Não armazena respostas, processa pagamentos ou confirma reservas automaticamente.

O hero usa um recorte do vídeo fornecido pelo usuário. A galeria usa as seis fotografias reais enviadas em 11/10/2026, sem retoques ou geração com IA. A pedido do usuário, também inclui somente a imagem da direita da comparação Air Touch previamente editada com IA; foi recortada sem novos retoques e aparece individualmente, sem o antes ou a seta. A captura do Instagram foi recortada para remover a interface e preservar a pessoa inteira; o usuário confirmou que o trabalho é da Angela. Uma segunda fotografia teve apenas a faixa preta superior recortada. Os derivados WebP reduzem o tamanho dos arquivos e preservam as proporções. As comparações editadas anteriores deixam de aparecer na página e os arquivos permanecem preservados. As imagens dos prémios e certificados continuam como apresentações gráficas recriadas a partir dos documentos fornecidos; não substituem os documentos oficiais.

A proposta de reduzir os textos foi cancelada pelo usuário antes da publicação. Na atualização de busca local, o usuário também pediu preservar a apresentação: o corpo do HTML, os textos, as nove seções, os links e a navegação permanecem integralmente iguais. Apenas o título de busca, os metadados, os dados estruturados e o sitemap foram aprimorados. Os metadados identificam Rosângela também como Angela R./Angela Roh e incluem os 16 anos de experiência profissional confirmados pelo usuário; não inferem a data de abertura do salão. Veja [SEO.md](SEO.md) para os próximos passos no Google Maps e Search Console.

O destaque de avaliações apresenta a nota 5,0 e o patamar de 116+ avaliações confirmado pelo usuário. Não há atualização automática. Os cartões apresentam Ana Catarina Silva, Tania Vicente e Eli Suarez, a partir dos relatos fornecidos pelo usuário, com ajustes de ortografia e pontuação e seleção de trechos sem mudar o sentido. Ana e Tania foram também conferidas diretamente nos perfis públicos do Google Maps; as suas fotos públicas estão em arquivos WebP locais, sem geração com IA. Eli foi conferida na captura fornecida e usa as iniciais. Os cartões não têm links individuais nem referências a diretórios; o acesso geral às avaliações continua no Google. A consulta não disponibilizou todas as avaliações do salão.

O endereço do GitHub Pages é público. O domínio definitivo é uma configuração separada.

Referência da configuração: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
