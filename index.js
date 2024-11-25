import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3ta4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extend: true }));

app.use(express.static('./pages/public'));

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function cadastroEmpresarial(req, resp) {
    resp.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Cadastrar Produtos</title>
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
                    <h1>Cadastre o Produto</h1>
                    <form action="/cadastrar" method="POST">
                            <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="codigoBarras" class="form-label">Código de Barras</label>
                                <input type="text" class="form-control" id="codigoBarras" name="codigoBarras" placeholder="Código de barras">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="descricao" class="form-label">Descrição do Produto</label>
                                <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Descrição do produto">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="precoCusto" class="form-label">Preço de Custo</label>
                                <input type="number" class="form-control" id="precoCusto" name="precoCusto" placeholder="Preço de custo">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="precoVenda" class="form-label">Preço de Venda</label>
                                <input type="number" class="form-control" id="precoVenda" name="precoVenda" placeholder="Preço de venda">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="validade" class="form-label">Data de Validade</label>
                                <input type="date" class="form-control" id="validade" name="validade">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="qtdEstoque" class="form-label">Quantidade em Estoque</label>
                                <input type="number" class="form-control" id="qtdEstoque" name="qtdEstoque" placeholder="Quantidade em estoque">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nomeFabricante" class="form-label">Nome do Fabricante</label>
                                <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante" placeholder="Nome do fabricante">
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
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin) {
        dataHoraUltimoLogin = '';
    }
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
                                        <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                                        <p class="nav-link disable" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div class="container-content" style="background-color: #e0e0e0;">
                        <h1>Bem-vindo ao PortalEmpresarial</h1>
                        <p>Cadastre seus produtos e comece a expandir seu portfólio com facilidade. Mantenha seu estoque organizado e aumente sua presença no mercado com informações precisas e atualizadas!</p>
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

let listaProdutos = [];

function cadastrarProduto(req, resp) {

    const codigoBarras = req.body.codigoBarras ;
    const descricao = req.body.descricao;
    const precoCusto = req.body.precoCusto;
    const precoVenda = req.body.precoVenda;
    const validade = req.body.validade;
    const qtdEstoque = req.body.qtdEstoque;
    const nomeFabricante = req.body.nomeFabricante;

    if (codigoBarras && descricao && precoCusto && precoVenda && validade && qtdEstoque && nomeFabricante) {

        const Produto = { codigoBarras, descricao, precoCusto, precoVenda, validade, qtdEstoque, nomeFabricante };

        listaProdutos.push(Produto);

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
                        <h1 class="text-center">Produto Cadastrado com Sucesso</h1>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Código de Barras</th>
                                    <th>Descrição</th>
                                    <th>Preço de Custo</th>
                                    <th>Preço de Venda</th>
                                    <th>Data de Validade</th>
                                    <th>Quantidade em Estoque</th>
                                    <th>Nome do Fabricante</th>
                                </tr>
                            </thead>
                            <tbody>`);

        for (var i = 0; i < listaProdutos.length; i++) {
            resp.write(`<tr>
                                <td>${listaProdutos[i].codigoBarras}</td>
                                <td>${listaProdutos[i].descricao}</td>
                                <td>${listaProdutos[i].precoCusto}</td>
                                <td>${listaProdutos[i].precoVenda}</td>
                                <td>${listaProdutos[i].validade}</td>
                                <td>${listaProdutos[i].qtdEstoque}</td>
                                <td>${listaProdutos[i].nomeFabricante}</td>
                        </tr>
                            `);
        }

        resp.write(`        </tbody>
                                </table>
                                <div class="container-actions">
                                    <a class="btn btn-primary" href="/cadastrar" role="button">Cadastrar Outro Produto</a>
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
                    <h1>Cadastre o Produto</h1>
                    <form action="/cadastrar" method="POST">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="codigoProduto" class="form-label">Código do Produto</label>
                                <input type="text" class="form-control" id="codigoProduto" name="codigoProduto" placeholder="Digite o código do produto" value="${codigoBarras}">
                                ${!codigoBarras ? '<span><p class="text-danger">Por favor, informe o código de barra do produto.</p></span>' : ''}
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="descricao" class="form-label">Descrição do Produto</label>
                                <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Descrição do produto" value="${descricao}">
                                ${!descricao ? '<span><p class="text-danger">Por favor, informe a descrição do produto.</p></span>' : ''}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="precoCusto" class="form-label">Preço de Custo</label>
                                <input type="number" class="form-control" id="precoCusto" name="precoCusto" placeholder="Preço de custo" value="${precoCusto}">
                                ${!precoCusto ? '<span><p class="text-danger">Por favor, informe o preço do produto.</p></span>' : ''}
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="precoVenda" class="form-label">Preço de Venda</label>
                                <input type="number" class="form-control" id="precoVenda" name="precoVenda" placeholder="Preço de venda" value="${precoVenda}">
                                ${!precoVenda ? '<span><p class="text-danger">Por favor, informe o preço de venda do produto.</p></span>' : ''}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="validade" class="form-label">Data de Validade</label>
                                <input type="date" class="form-control" id="validade" name="validade" value="${validade}">
                                ${!validade ? '<span><p class="text-danger">Por favor, informe a validade dos produtos.</p></span>' : ''}
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="qtdEstoque" class="form-label">Quantidade em Estoque</label>
                                <input type="number" class="form-control" id="qtdEstoque" name="qtdEstoque" placeholder="Quantidade em estoque" value="${qtdEstoque}">
                                ${!qtdEstoque ? '<span><p class="text-danger">Por favor, informe a quantidade do estoque do produto.</p></span>' : ''}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nomeFabricante" class="form-label">Nome do Fabricante</label>
                                <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante" placeholder="Nome do fabricante" value="${nomeFabricante}">
                                ${!nomeFabricante ? '<span><p class="text-danger">Por favor, informe o nome do fabricante do produto.</p></span>' : ''}
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

function autenticarUsuario(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === '123') {
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleDateString(), { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
        resp.redirect('/');
    } else {
        resp.send(`
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>Login</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="alert alert-danger" role="alert">
                            Usuário ou senha inválidos!
                        </div>
                        <div>
                            <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                        </div>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </html>`);
    }
}

function verificarAutentificacao(req, resp, next) {
    if (req.session.usuarioLogado) {
        next();
    }
    else {
        resp.redirect('/login.html');
    }
}

app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
});

app.post('/login', autenticarUsuario);
app.get('/', verificarAutentificacao, menu);
app.get('/cadastrar', verificarAutentificacao, cadastroEmpresarial);

app.post('/cadastrar', verificarAutentificacao, cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`)
});