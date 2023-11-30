//import express from 'express' // No me funcionaba
//const express = require('express')
import express from 'express'
//import {productManager} from productManager
import { ProdManager } from './ProductManager.js'
//const test = require('../ProductManager.js')

const PORT = 8080
const app = express()
app.use(express.urlencoded({extended: true}))

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
      let productsLimit = products.slice(0, limit)
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

