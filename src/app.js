//import express from 'express' // No me funcionaba
const express = require('express')

const app = express()

PORT = 8080

app.get('/saludo', (req, res) => {
    res.send('Hola a todos, desde express 5')
})

app.listen(PORT, () => console.log('Servidor arriba!'))