function createExperienciaItem() {
    const div = document.createElement('div');
    div.className = 'dynamic-list-item';
    div.innerHTML = `
        <input type="text" placeholder="Cargo" name="cargo" required>
        <input type="text" placeholder="Empresa" name="empresa" required>
        <input type="text" placeholder="Período Ex: 2020 - 2024" name="periodo" required>
        <button type="button" class="remove" onclick="this.parentNode.remove()">Remover</button>
    `;
    return div;
}
function addExperiencia() {
    document.getElementById('experiencias').appendChild(createExperienciaItem());
}
function createFormacaoItem() {
    const div = document.createElement('div');
    div.className = 'dynamic-list-item';
    div.innerHTML = `
        <input type="text" placeholder="Curso" name="curso" required>
        <input type="text" placeholder="Instituição" name="instituicao" required>
        <input type="text" placeholder="Período Ex: 2020 - 2025" name="ano" required>
        <button type="button" class="remove" onclick="this.parentNode.remove()">Remover</button>
    `;
    return div;
}
function addFormacao() {
    document.getElementById('formacoes').appendChild(createFormacaoItem());
}
document.getElementById('curriculoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        resumo: form.resumo.value,
        experiencias: [],
        formacoes: []
    };
    document.querySelectorAll('#experiencias .dynamic-list-item').forEach(item => {
        data.experiencias.push({
            cargo: item.querySelector('[name="cargo"]').value,
            empresa: item.querySelector('[name="empresa"]').value,
            periodo: item.querySelector('[name="periodo"]').value
        });
    });
    document.querySelectorAll('#formacoes .dynamic-list-item').forEach(item => {
        data.formacoes.push({
            curso: item.querySelector('[name="curso"]').value,
            instituicao: item.querySelector('[name="instituicao"]').value,
            ano: item.querySelector('[name="ano"]').value
        });
    });
    const win = window.open('', '_blank');
    if (!win) {
        alert('Por favor, permita pop-ups para visualizar o currículo gerado.');
        return;
    }
    const resp = await fetch('../php/curriculo.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const json = await resp.json();
    // Montar o HTML do currículo e inclui o botão de download
    const curriculoHtml = `
        <html>
        <head>
            <title>Currículo Gerado</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="../css/style.css">
        </head>
        <body>
            <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;flex-direction:column;">
                ${json.curriculo}
                <button class="btn-download" id="btnDownloadCurriculo">Download</button>
            </div>
            <script>
                document.getElementById('btnDownloadCurriculo').onclick = function() {
                    var curriculoHtml = document.querySelector('.curriculo-gerado').outerHTML;
                    var blob = new Blob([
                        '<html>\n<head>\n<meta charset="UTF-8">\n<title>Currículo</title>\n<link rel="stylesheet" href="../css/style.css">\n</head>\n<body>\n' + curriculoHtml + '\n</body>\n</html>'
                    ], {type: 'text/html'});
                    var url = URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = 'curriculo.html';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                };
            <\/script>
        </body>
        </html>
    `;
    win.document.open();
    win.document.write(curriculoHtml);
    win.document.close();
    document.getElementById('resultado').innerHTML = '';
});
addExperiencia();
addFormacao();
