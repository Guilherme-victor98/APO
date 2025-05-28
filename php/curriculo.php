<?php
// Processa o formulário e retorna o currículo em HTML
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    // Validação
    $nome = htmlspecialchars($data['nome'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $telefone = htmlspecialchars($data['telefone'] ?? '');
    $resumo = htmlspecialchars($data['resumo'] ?? '');
    $experiencias = $data['experiencias'] ?? [];
    $formacoes = $data['formacoes'] ?? [];

    ob_start();
    ?>
    <div class="curriculo-gerado">
        <div style="background:#003366;color:#fff;padding:24px 32px 18px 32px;border-radius:10px 10px 0 0;box-shadow:0 2px 8px #00336622;">
            <h2 style="margin:0;font-size:2.2em;letter-spacing:1px;"><?= $nome ?></h2>
            <p style="margin:8px 0 0 0;font-size:1.1em;"><strong>Email:</strong> <?= $email ?> &nbsp;|&nbsp; <strong>Telefone:</strong> <?= $telefone ?></p>
        </div>
        <div style="background:#fff;padding:28px 32px 32px 32px;border-radius:0 0 10px 10px;box-shadow:0 2px 8px #00336622;">
            <h3 style="color:#003366;margin-top:0;">Sobre mim</h3>
            <p style="font-size:1.08em;line-height:1.6;"><?= nl2br($resumo) ?></p>
            <h3 style="color:#003366;margin-top:28px;">Experiências</h3>
            <ul style="list-style:none;padding:0;">
                <?php foreach (
                    $experiencias as $exp): ?>
                    <li style="margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid #e0e0e0;">
                        <span style="font-weight:bold;font-size:1em;display:block;">
                            <?= htmlspecialchars($exp['cargo']) ?>
                        </span>
                        <span style="color:#003366;font-size:0.95em; display:block; margin-bottom:2px;">
                            <?= htmlspecialchars($exp['empresa']) ?>
                        </span>
                        <span style="color:#888;"> (<?= htmlspecialchars($exp['periodo']) ?>)</span>
                    </li>
                <?php endforeach; ?>
            </ul>
            <h3 style="color:#003366;margin-top:28px;">Formação</h3>
            <ul style="list-style:none;padding:0;">
                <?php foreach ($formacoes as $form): ?>
                    <li style="margin-bottom:14px;">
                        <span style="font-weight:bold;font-size:1.08em;display:block;">
                            <?= htmlspecialchars($form['curso']) ?>
                        </span>
                        <span style="color:#003366;display:block;margin-top:2px;">
                            <?= htmlspecialchars($form['instituicao']) ?>
                        </span>
                        <span style="color:#888;display:block;">
                            (<?= htmlspecialchars($form['ano']) ?>)
                        </span>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
    <?php
    $curriculoHtml = ob_get_clean();
    echo json_encode(['curriculo' => $curriculoHtml]);
    exit;
}
