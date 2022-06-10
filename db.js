async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "r14",
        password: "Re14$$",
        database:"projeto_video"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}

//conecta()

async function selectFilmes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM projeto_video.filmes")
    return rows
}

async function selectSingle(id){
    const conectado = await conecta()
    const values = [id]
    const [rows] = await conectado.query("SELECT * FROM projeto_video.filmes WHERE filmes_id=?", values)
    console.log(rows)
    return rows
}
async function selectPromocoes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM projeto_video.filmes WHERE promo=1")
    return rows
}
async function updatePromocoes(promo,id){
    const conectado = await conecta()
    const values = [promo,id]
    return await conectado.query("UPDATE filmes SET promo=? WHERE filmes_id=?", values)
   
}
async function insertFilmes(filme){
    const conectado = await conecta()
    const values = [filme.titulo, filme.categoria,filme.ano,filme.sinopse,filme.imagem]
    return await conectado.query("INSERT INTO filmes (titulo,categora,ano,sinopse,imagem) VALUES(?,?,?,?,?)", values)
   
}

//selectFilmes()

module.exports = {selectFilmes,selectSingle,selectPromocoes,updatePromocoes,insertFilmes}
