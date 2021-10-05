
//novo
//------------------------Variaveis do sistema-------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencondeParser = bodyParser.urlencoded({ extended: false });

// require('./model/index')//Importação do sequelize



//------------------------Conexão com o banco Heroku-------------------------------------------

const sql = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b73be7f80e548e',
    password: '61138a22',
    port: 3306
});

sql.query("use heroku_e27246f552cf39b");



//------------------------Template engine------------------------

app.engine("handlebars", handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');







//Start server
app.listen(3000, function (req, res) {
    console.log('Servidor está rodando!');
});


//Routes and Templates
app.get("/", function (req, res) {
    // res.send("Essa é minha página inicial"); //Mostrar Mensagem simples
    // res.sendFile(__dirname+"/index.html"); //Chamar arquivo externo
    // console.log(req.params.id)
    res.render('index');

});


//------------------------Rotas Javascript e Css------------------------
app.get("/javascript", function (req, res) {
    res.sendFile(__dirname + '/js/javascript.js')
});

app.get("/style", function (req, res) {
    res.sendFile(__dirname + '/css/style.css')
});


//------------------------Exemplo de rota------------------------
app.get("/inserir", function (req, res) {
    res.render("inserir");
})



//------------------------Categoria-------------------------------------------
app.get("/categorias", function (req, res) {
    res.render(__dirname + '/views/layouts/Categoria/categorias');
})

//Deletar Categoria
app.get('/deletarCategorias/:categoria_id', function (req, res) { sql.query("delete from categorias where categoria_id=?", [req.params.categoria_id]); res.render('deletarCategorias'); });

//Form Categorias
app.get("/inserirCategorias", function (req, res) { res.render(__dirname + '/views/layouts/Categoria/inserirCategorias'); });

//Insert Categoria
app.post("/controllerFormCategoria", urlencondeParser, function (req, res) {
    sql.query("insert into categorias values(?,?)", [req.body.categoria_id, req.body.nome_categoria]);
    res.render('controllerFormCategoria');
    console.log(req.body.nome_categoria);
});

//Select Categorias
app.get("/selectCategorias/:id?", function (req, res) {
    if (!req.params.id) {
        sql.query("select * from categorias order by categoria_id asc", function (err, results, fields) {
            res.render('selectCategorias', { data: results })
        });
    } else {
        sql.query("select * from categorias where categoria_id=? order by categoria_id asc ", [req.params.categoria_id], function (err, results, fields) {
            res.render('selectCategorias', { data: results })
        });
    }
});

//Update Categoria - trazer dados preenchidos
app.get("/updateCategorias/:categoria_id", function (req, res) {
    sql.query("select * from categorias where categoria_id=?", [req.params.categoria_id], function (err, results, fields) {
        res.render('updateCategorias', {categoria_id: req.params.categoria_id, 
            nome_categoria: results[0].nome_categoria, 
            });
    });
});

//Atualizar dados
app.post("/controllerUpdateCategorias", urlencondeParser, function (req, res) {
    sql.query("update categorias set nome_categoria=? where categoria_id=?",
    [req.body.nome_categoria,  
        req.body.categoria_id]);
    res.render("/controllerUpdateCategorias");
});

//Delete
app.get('/deletarCategorias/:categoria_id', function (req, res) { 
    sql.query("delete from categorias where categoria_id=?", 
    [req.params.categoria_id]); 
res.render('deletarCategorias'); });


//------------------------Cliente-------------------------------------------
app.get("/cliente", function (req, res) {
    res.render(__dirname + '/views/layouts/Cliente/cliente');
})

//Rota Insert cliente
app.get("/inserirCliente", function (req, res) {
    res.render(__dirname + '/views/layouts/Cliente/inserirCliente');
})

//Rota post/insert sql Cliente
app.post("/controllerFormCliente", urlencondeParser, function (req, res) {
    sql.query("insert into cliente values(?,?,?,?,?,?,?,?,?)",
        [req.body.cliente_id,
        req.body.endereco_cliente,
        req.body.nome_cliente,
        req.body.cel_cliente,
        req.body.email_cliente,
        req.body.senha_cliente,
        req.body.datanasc_cliente,
        req.body.rg_cliente,
        req.body.cpf_cliente]);

    res.render('controllerFormCliente');
    console.log(req.body.nome_cliente);
});

//Rota select sql cliente
app.get("/selectCliente/:id?", function (req, res) {
    if (!req.params.cliente_id) {
        sql.query("select * from cliente order by cliente_id asc", function (err, results, fields) {
            res.render('selectCliente', { data: results })
        });
    } else {
        sql.query("select * from cliente where cliente_id=? order by cliente_id asc ", [req.params.cliente_id], function (err, results, fields) {
            res.render('selectCliente', { data: results })
        });
    }
});

//Update Cliente - trazer dados preenchidos
app.get("/updateCliente/:cliente_id", function (req, res) {
    sql.query("select * from cliente where cliente_id=?", [req.params.cliente_id], function (err, results, fields) {
        res.render('updateCliente', {
            cliente_id:req.params.cliente_id, 
            endereco_cliente: results[0].endereco_cliente, 
            nome_cliente: results[0].nome_cliente, 
            cel_cliente: results[0].cel_cliente, 
            email_cliente: results[0].email_cliente, 
            senha_cliente: results[0].senha_cliente, 
            datanasc_cliente: results[0].datanasc_cliente, 
            rg_cliente: results[0].rg_cliente, 
            cpf_cliente: results[0].cpf_cliente, 
            });
    });
});

//Atualizar dados
app.post("/controllerUpdateCliente", urlencondeParser, function (req, res) {
    sql.query("update cliente set nome_cliente=? where cliente_id=?",
    [req.body.nome_cliente,  
        req.body.cliente_id]);
    res.render("/controllerUpdateCliente");
});




//------------------------Pagamento-------------------------------------------
app.get("/pagamento", function (req, res) {
    res.render(__dirname + '/views/layouts/Pagamento/pagamento');
})

app.get("/inserirPagamento", function (req, res) {
    res.render(__dirname + '/views/layouts/Pagamento/inserirPagamento');
})

app.post("/controllerFormPagamento", urlencondeParser, function (req, res) {
    sql.query("insert into pagamento values(?,?)",
        [req.body.id_pagamento, req.body.forma_pagamento]);

    res.render('controllerFormPagamento');

    console.log(req.body.forma_pagamento);
});

//Rota select sql Pagamento
app.get("/selectPagamento/:id?", function (req, res) {
    if (!req.params.id_pagamento) {
        sql.query("select * from pagamento order by id_pagamento asc", function (err, results, fields) {
            res.render('selectPagamento', { data: results })
        });
    } else {
        sql.query("select * from pagamento where id_pagamento=? order by id_pagamento asc ", [req.params.id_pagamento], function (err, results, fields) {
            res.render('selectPagamento', { data: results })
        });
    }
});


//------------------------Produto-------------------------------------------
app.get("/produto", function (req, res) {
    res.render(__dirname + '/views/layouts/Produto/produto');
})

app.get("/inserirProduto", function (req, res) {
    res.render(__dirname + '/views/layouts/Produto/inserirProduto');
})

app.post("/controllerFormProduto", urlencondeParser, function (req, res) {
    sql.query("insert into produto values(?,?,?,?,?,?)",
        [req.body.produto_id,
        req.body.nome_produto,
        req.body.preco_produto,
        req.body.categoria_id,
        req.body.vendedor_id,
        req.body.qtd_estoque]);

    res.render('controllerFormProduto');

    console.log(req.body.forma_pagamento);
});

//Rota select sql Produto
app.get("/selectProduto/:id?", function (req, res) {
    if (!req.params.produto_id) {
        sql.query("select * from produto order by produto_id asc", function (err, results, fields) {
            res.render('selectProduto', { data: results })
        });
    } else {
        sql.query("select * from produto where produto_id=? order by produto_id asc ", [req.params.produto_id], function (err, results, fields) {
            res.render('selectProduto', { data: results })
        });
    }
});


//------------------------Venda-------------------------------------------
app.get("/venda", function (req, res) {
    res.render("venda");
})

//------------------------Venda do produto-------------------------------------------
app.get("/venda_do_produto", function (req, res) {
    res.render("venda");
})


//------------------------Vendedor-------------------------------------------
app.get("/vendedor", function (req, res) {
    res.render("vendedor");
})


//controllerForm

app.post("/controllerForm", urlencondeParser, function (req, res) {
    console.log(req.body.name);



});


