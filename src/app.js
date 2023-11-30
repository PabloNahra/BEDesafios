//import express from 'express' // No me funcionaba
//const express = require('express')
import express from 'express'
//import {productManager} from productManager
import { ProdManager } from '../ProductManager.js'
//const test = require('../ProductManager.js')

const PORT = 8080
const app = express()
app.use(express.urlencoded({extended: true}))

app.get('/saludo', (req, res) => {
    res.send('Hola a todos, desde express 5')
})

// Params
app.get('/categorias/:categoria', (req, res) =>{
    res.send(`Bienvenido a la sección de la categoria ${req.params.categoria}`)
})

// Queries
app.get('/pruebaQueries', (req, res) =>{
    let consultas = req.query
    let {nombre, apellido} = req.query
    //res.send(consultas)
    res.send(`Bienvenido ${consultas.nombre} ${consultas.apellido}`)
})

// Queries filtro por categoria
const productos = [
    {id: 1, nombre: "Amiguris 1", categoria: "bebe"},
    {id: 2, nombre: "Amiguris 2", categoria: "bebe"},
    {id: 3, nombre: "Alfombra 3", categoria: "casa"},
    {id: 4, nombre: "Alfombra 4", categoria: "casa"},
]

app.get('/seccion', (req, res) => {
    let categoria = req.query.categoria
    // Si no se ingreso la categoria o no existe no aplicamos el filtro
    if(!categoria || (categoria!=='bebe'&&categoria!=='casa')) return res.send({productos})
    let productosFiltrados = productos.filter(producto => producto.categoria===categoria)
    res.send({productos:productosFiltrados})
})

/*
app.get('/products', (req, res) => {
        let products = ProdManager.getLength()
        res.send({products})
})
*/
app.get('/cantproducts', async (req, res) => {
    try {
      const productManager = new ProdManager('./products.json');
      let products = await productManager.getLength();
      res.send({ products });
    } catch (error) {
      console.error('Error al obtener la longitud de los productos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

app.get('/products', async (req, res) => {
    try {
      let limit = parseInt(req.query.limit, 10);
      const productManager = new ProdManager('./products.json');
      let products = await productManager.getProducts();
      // Si no se configura limite enviamos todos los productos
      if(!limit){
        return res.send({ products });
      }
      // Si se configuro limite solo enviamos esa X cantidad de productos
      let productsLimit = products.slice(0, limitf)
      return res.send({productsLimit});
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

app.get('/products/:id', async (req, res) => {
    try {
      const productManager = new ProdManager('./products.json');
      let product = await productManager.getProductById(parseInt(req.params.id));
      // Si no se encontro el producto por id
      if(!product){
        return res.send('No se encontró el producto');
      }
      // Si se encontro el producto
      return res.send({product});
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });




app.listen(PORT, () => console.log('Servidor express ARRIBA!'))

