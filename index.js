import express from 'express';

const app = express();

app.use(express.urlencoded({ extend: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function cadastroEmpresarial(req, resp) {
    resp.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Cadastrar Empresa</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
                <style>
                    body {
                        background-color: #333333;
                        font-family: Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        margin: 0;
                    }

                    .navbar {
                        background-color: gray;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    .navbar-brand, .nav-link {
                        font-family: 'Cinzel', serif;
                        font-weight: bold;
                        color: #D6C9B7 !important;
                    }

                    .navbar-brand:hover, .nav-link:hover {
                        color: white !important;
                    }

                    .container-content {
                        max-width: 1000px;
                        width: 90%;
                        margin:115px auto;
                        padding: 20px;
                        background-color: #E0DFD9;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        border-radius: 10px;
                    }

                    h1 {
                        font-family: 'Cinzel', serif;
                        color: #D6C9B7;
                        text-align: center;
                        border: 2px solid #D6C9B7;
                        padding: 10px;
                        border-radius: 5px; 
                        background-color: rgba(255, 255, 255, 0.8);
                        text-decoration: underline;
                        text-decoration-color: #D6C9B7
                    }

                    p {
                        font-weight: bold;
                    }

                    .btn-primary {
                        background-color: gray;
                        border-color: #BFBFBF;
                    }

                    .btn-primary:hover {
                        background-color: #D6C9B7;
                        border-color: gray;
                    }

                    .footer {
                        background-color: gray;
                        color: #fff;
                        font-size: 14px;
                        text-align: center;
                        padding: 20px 0;
                        margin-top: auto;
                    }

                    .form-label {
                        text-align: left;
                    }

                </style>
            </head>
            <body>

                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            PortalEmpresarial
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Voltar ao Menu</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="container-content">
                    <h1>Cadastre Sua Empresa</h1>
                <form action="/cadastrar" method="POST">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="Digite o CNPJ">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="razaoSocial" class="form-label">Razão Social</label>
                            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Razão Social ou Nome do Fornecedor">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="seuemail@exemplo.com">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(00)00000-0000">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua, número, bairro">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf">
                                <option value="" selected disabled>Selecione o estado</option>
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonas (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep" placeholder="CEP">
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary w-50 mx-auto d-block">Cadastrar</button>
                        </div>
                    </form>
                </div>

                <div class="footer">
                        <p>&copy; 2024 PortalEmpresarial. Todos os direitos reservados.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function menu(req, resp) {
    resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>PortalEmpresarial</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
                    <style>
                        body {
                            background-color: #333333;
                            font-family: Arial, sans-serif;
                            display: flex;
                            flex-direction: column;
                            min-height: 100vh;
                            margin: 0;
                        }

                        .navbar {
                            background-color: gray;
                            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        }

                        .navbar-brand, .nav-link {
                            font-family: 'Cinzel', serif;
                            font-weight: bold;
                            color: #D6C9B7 !important;
                        }

                        .navbar-brand:hover, .nav-link:hover {
                            color: white !important;
                        }

                        .container-content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            max-width: 800px;
                            margin: 110px auto;
                            text-align: center;
                            padding: 20px;
                            background-color: #E0DFD9 !important;
                            border-radius: 10px;
                            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                            flex-grow: 1;
                        }

                        h1 {
                            font-family: 'Cinzel', serif;
                            color: white;
                            font-size: 2.5rem;
                            font-weight: bold;
                            margin-bottom: 20px;
                            padding: 10px;
                            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
                            text-decoration: underline;
                            text-decoration-color: white;
                        }

                        p {
                            font-weight: bold;
                        }

                        .btn-primary {
                            background-color: #D6C9B7;
                            border-color: #BFBFBF;
                        }

                        .btn-primary:hover {
                            background-color: gray;
                            border-color: white;
                        }

                        .footer {
                            background-color: gray;
                            color: #fff;
                            font-size: 14px;
                            text-align: center;
                            padding: 20px 0;
                            margin-top: auto;
                        }

                        .container-actions {
                            text-align: center;
                            margin-top: 30px;
                        }
                    </style>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/">PortalEmpresarial</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/cadastrar">Cadastrar</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div class="container-content" style="background-color: #e0e0e0;">
                        <h1>Bem-vindo ao PortalEmpresarial</h1>
                        <p>Cadastre sua empresa e conecte-se a uma rede de negócios em constante crescimento. Junte-se a nós e comece a expandir sua presença no mercado!</p>
                        <a href="/cadastrar" class="btn btn-primary btn-lg mt-3">Cadastrar</a>
                    </div>

                    <div class="footer">
                        <p>&copy; 2024 PortalEmpresarial. Todos os direitos reservados.</p>
                    </div>

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </body>
            </html>
        `);
}

let listaEmpresas = [];

function cadastrarEmpresa(req, resp) {

    const cnpj = req.body.cnpj;
    const razaoSocial = req.body.razaoSocial;
    const nomeFantasia = req.body.nomeFantasia;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;

    if (cnpj && razaoSocial && nomeFantasia && email && telefone && endereco && cidade && uf && cep) {

        const Empresa = { cnpj, razaoSocial, nomeFantasia, email, telefone, endereco, cidade, uf, cep }

        listaEmpresas.push(Empresa);

        resp.write(`
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Lista de Empresas Cadastradas</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
                        <style>
                            body {
                                background-color: #333333;
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                min-height: 100vh;
                                margin: 0;
                            }

                            .navbar {
                                background-color: gray;
                                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
                            }

                            .navbar-brand, .nav-link {
                                font-family: 'Cinzel', serif;
                                font-weight: bold;
                                color: #D6C9B7 !important;
                            }

                            .navbar-brand:hover, .nav-link:hover {
                                color: white !important;
                            }

                            .container {
                                max-width: 90%;
                                width: 90%;
                                margin: 100px auto;
                                padding: 30px;
                                background-color: #E0DFD9;
                                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                                border-radius: 10px;
                                height: auto;
                            }

                            .table {
                                width: 100%;
                                background-color: white;
                                border-radius: 10px;
                                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                                margin-top: 10px;
                            }

                            .table th, .table td {
                                vertical-align: middle;
                            }

                            .btn-primary {
                                background-color: gray;
                                border-color: #BFBFBF;
                            }

                            .btn-primary:hover {
                                background-color: #D6C9B7;
                                border-color: gray;
                            }

                            .container-actions {
                                text-align: center;
                                margin-top: 30px;
                            }

                        </style>
                    </head>
                    <body>
                        <nav class="navbar navbar-expand-lg">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="/">PortalEmpresarial</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </nav>

                        <div class="container">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">CNPJ</th>
                                        <th scope="col">Razão Social</th>
                                        <th scope="col">Nome Fantasia</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Telefone</th>
                                        <th scope="col">Endereço</th>
                                        <th scope="col">Cidade</th>
                                        <th scope="col">UF</th>
                                        <th scope="col">CEP</th>
                                    </tr>
                                </thead>
                                <tbody>`);

        for (var i = 0; i < listaEmpresas.length; i++) {
            resp.write(`<tr>
                                                        <td>${listaEmpresas[i].cnpj}</td>
                                                        <td>${listaEmpresas[i].razaoSocial}</td>
                                                        <td>${listaEmpresas[i].nomeFantasia}</td>
                                                        <td>${listaEmpresas[i].email}</td>
                                                        <td>${listaEmpresas[i].telefone}</td>
                                                        <td>${listaEmpresas[i].endereco}</td>
                                                        <td>${listaEmpresas[i].cidade}</td>
                                                        <td>${listaEmpresas[i].uf}</td>
                                                        <td>${listaEmpresas[i].cep}</td>
                                                    </tr>
                                            `);
        }

        resp.write(`        </tbody>
                                </table>
                                <div class="container-actions">
                                    <a class="btn btn-primary" href="/cadastrar" role="button">Cadastrar Outra Empresa</a>
                                    <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                    </html>
                `);
    }
    else {
        resp.write(`
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Cadastrar Empresa</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
                <style>
                    body {
                        background-color: #333333;
                        font-family: Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        margin: 0;
                    }

                    .navbar {
                        background-color: gray;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    .navbar-brand, .nav-link {
                        font-family: 'Cinzel', serif;
                        font-weight: bold;
                        color: #D6C9B7 !important;
                    }

                    .navbar-brand:hover, .nav-link:hover {
                        color: white !important;
                    }

                    .container-content {
                        max-width: 1000px;
                        width: 90%;
                        margin:115px auto;
                        padding: 20px;
                        background-color: #E0DFD9;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        border-radius: 10px;
                    }

                    h1 {
                        font-family: 'Cinzel', serif;
                        color: #D6C9B7;
                        text-align: center;
                        border: 2px solid #D6C9B7;
                        padding: 10px;
                        border-radius: 5px; 
                        background-color: rgba(255, 255, 255, 0.8);
                        text-decoration: underline;
                        text-decoration-color: #D6C9B7
                    }

                    p {
                        font-weight: bold;
                    }

                    .btn-primary {
                        background-color: gray;
                        border-color: #BFBFBF;
                    }

                    .btn-primary:hover {
                        background-color: #D6C9B7;
                        border-color: gray;
                    }

                    .footer {
                        background-color: gray;
                        color: #fff;
                        font-size: 14px;
                        text-align: center;
                        padding: 20px 0;
                        margin-top: auto;
                    }

                    .form-label {
                        text-align: left;
                    }

                </style>
            </head>
            <body>

                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            PortalEmpresarial
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Voltar ao Menu</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="container-content">
                    <h1>Cadastre Sua Empresa</h1>
                <form action="/cadastrar" method="POST">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="Digite o CNPJ" value="${cnpj}">
                        
            `);
        if (!cnpj) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe o cnpj da empresa.</p></span>
                    </div>
                    `);
        }
        resp.write(`
                </div>
                        <div class="col-md-6 mb-3">
                            <label for="razaoSocial" class="form-label">Razão Social</label>
                            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Razão Social ou Nome do Fornecedor" value="${razaoSocial}">
                `);
        if (!razaoSocial) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe a razão social ou o nome do fornecedor da empresa.</p></span>
                        </div>
                        `);
        }
        resp.write(`
                </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" value="${nomeFantasia}">
                            `);
        if (!nomeFantasia) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o nome fantasia da empresa.</p></span>
                        </div>
                        `);
        }
        resp.write(`
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="seuemail@exemplo.com" value="${email}">
                        `);
        if (!email) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o email de contato da empresa.</p></span>
                        </div>
                        `);
        }

        resp.write(`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(00)00000-0000" value="${telefone}">
                 `);

        if (!telefone) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o telefone da empresa.</p></span>
                        </div>
                        `);
        }

        resp.write(`  
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua, número, bairro" value="${endereco}">
                `);

        if (!endereco) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o endereço da empresa.</p></span>
                        </div>
                        `);
        }
        resp.write(`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" value="${cidade}">
                `);

        if (!cidade) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe a cidade onde a empresa está situada.</p></span>
                        </div>
                        `);
        }
        
        resp.write(`
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf">
                        `);

        const estados = [
            { sigla: "AC", nome: "Acre (AC)" },
            { sigla: "AL", nome: "Alagoas (AL)" },
            { sigla: "AP", nome: "Amapá (AP)" },
            { sigla: "AM", nome: "Amazonas (AM)" },
            { sigla: "BA", nome: "Bahia (BA)" },
            { sigla: "CE", nome: "Ceará (CE)" },
            { sigla: "DF", nome: "Distrito Federal (DF)" },
            { sigla: "ES", nome: "Espírito Santo (ES)" },
            { sigla: "GO", nome: "Goiás (GO)" },
            { sigla: "MA", nome: "Maranhão (MA)" },
            { sigla: "MT", nome: "Mato Grosso (MT)" },
            { sigla: "MS", nome: "Mato Grosso do Sul (MS)" },
            { sigla: "MG", nome: "Minas Gerais (MG)" },
            { sigla: "PA", nome: "Pará (PA)" },
            { sigla: "PB", nome: "Paraíba (PB)" },
            { sigla: "PR", nome: "Paraná (PR)" },
            { sigla: "PE", nome: "Pernambuco (PE)" },
            { sigla: "PI", nome: "Piauí (PI)" },
            { sigla: "RJ", nome: "Rio de Janeiro (RJ)" },
            { sigla: "RN", nome: "Rio Grande do Norte (RN)" },
            { sigla: "RS", nome: "Rio Grande do Sul (RS)" },
            { sigla: "RO", nome: "Rondônia (RO)" },
            { sigla: "RR", nome: "Roraima (RR)" },
            { sigla: "SC", nome: "Santa Catarina (SC)" },
            { sigla: "SP", nome: "São Paulo (SP)" },
            { sigla: "SE", nome: "Sergipe (SE)" },
            { sigla: "TO", nome: "Tocantins (TO)" },
        ];

        for (let i = 0; i < estados.length; i++) {
            const {sigla, nome} = estados[i];
            if (sigla == uf) {
                resp.write(`
                    <option selected value="${sigla}">${nome}</option>
                `);
            }
            else {
                resp.write(`
                    <option value="${sigla}">${nome}</option>    
                `);
            }

        }

        resp.write(`
                </select>
        `);

        if (!uf) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o uf da empresa.</p></span>
                        </div>
                        `);
        }

        resp.write(`
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep" placeholder="CEP" value="${cep}">
                `);

        if (!cep) {
            resp.write(`
                        <div>
                            <span><p class="text-danger">Por favor, informe o cep da empresa.</p></span>
                        </div>
                        `);

        }

        resp.write(`
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary w-50 mx-auto d-block">Cadastrar</button>
                        </div>
                    </form>
                </div>

                <div class="footer">
                        <p>&copy; 2024 PortalEmpresarial. Todos os direitos reservados.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
                `);
    }

    resp.end();
}

app.get('/', menu);
app.get('/cadastrar', cadastroEmpresarial);

app.post('/cadastrar', cadastrarEmpresa);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`)
});