Gerador de Currículo 📄

Este é um projeto web simples que permite ao usuário preencher informações pessoais, 
experiências profissionais e formações acadêmicas para gerar um currículo em formato PDF.

🛠 Tecnologias Utilizadas

* HTML
* CSS
* JavaScript 
* PHP
* Biblioteca html2pdf.js para geração de PDF

📌 Passo a Passo de Criação
1. Estrutura HTML
Criação do arquivo index.html com o formulário para coletar:

* Nome completo
* Email e telefone
* Resumo sobre o usuário
* Experiências profissionais (dinâmicas)
* Formações acadêmicas (dinâmicas)

2. Estilo com CSS
O arquivo style.css foi desenvolvido para:

* Estilizar o formulário com foco em usabilidade
* Criar um layout adequado para impressão e exportação em A4
* Estilizar o botão de download

3. Lógica com JavaScript
No main.js:

* Criação e remoção dinâmica de campos de experiência e formação
* Captura e estruturação dos dados do formulário
* Envio dos dados via fetch em JSON para curriculo.php
* Renderização do currículo em uma nova aba e configuração da geração do PDF

4. Backend PHP
O curriculo.php:

* Recebe os dados via POST no formato JSON
* Constrói o HTML do currículo com as informações recebidas
* Retorna o HTML em JSON para ser usado no main.js

5. Geração do PDF
A biblioteca html2pdf.js foi utilizada para:

*Converter o currículo renderizado em HTML em um PDF
*Permitir download direto com o botão “Download PDF”

✅ Funcionalidades

* Adição e remoção dinâmica de múltiplas experiências e formações
* Geração do currículo sem recarregar a página
* Download direto em PDF com layout responsivo
