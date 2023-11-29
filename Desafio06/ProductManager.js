/*
Desafio entregable: Manejo de archivos (Clase 4)
https://docs.google.com/presentation/d/1CywBnZUj-NCXZMPz7qXi01rxnfOs-pT-4GugSFOQ5Yk/preview?slide=id.g1267f357822_0_208
Consigna
Realizar una clase “ProductManager” que gestione un conjunto de productos aplicando la persistencia en archivos
*/
const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getLength() {
        const products = await this.getProducts()
        return products.length
    }

    async getProducts(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            return products
        } catch (error){
            return []
        }
    }

    async addProduct(product){
        if (!product.title || !product.description || !product.price || 
            !product.thumbnail || !product.code || !product.stock == undefined || 
            !product.stock == null) {
            return console.error('Datos incompletos')   
            }

        const products = await this.getProducts()            
        const newProduct = {
            id: await this.getLength() + 1,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        }
        
        products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
    }

    async getProductById(id){
        const products = await this.getProducts()
        const product = products.find(p => p.id === id)
        if (!product){
            return console.error('Prod NO encontrado')
        }
        return product        
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        const productsNotDeleted = products.filter(product => product.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productsNotDeleted), 'utf-8')
    }

    async updateProduct(id, productToUpdate){
        const products = await this.getProducts()
        const updatedProducts = products.map(product => {
            if(product.id === id){
                return {
                    ...product,
                    ...productToUpdate,
                    id
                }
            }
            return product
        }) 

    await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts), 'utf-8')

    }
}



// Testeando
const test = async () => {
    const productManager = new ProductManager('./products.json')

    await productManager.addProduct({
        title: 'Amiguris',
        description: 'Muñecos de crochet',
        price: 10,
        thumbnail: 'https://www.littlebee.cl/ballena-l',
        code: '001',
        stock: 1 
    })

    await productManager.addProduct({
        title: 'Amiguris 2',
        description: 'Muñecos de crochet 2',
        price: 20,
        thumbnail: 'https://www.littlebee.cl/ballena-l',
        code: '002',
        stock: 2 
    })

    await productManager.addProduct({
        title: 'Amiguris 3',
        description: 'Muñecos de crochet 3',
        price: 30,
        thumbnail: 'https://www.littlebee.cl/ballena-l',
        code: '003',
        stock: 3 
    })

    const product1 = await productManager.getProductById(1)
    console.log(product1)

    await productManager.updateProduct(2,  {title: "Amiguris UPDATED 2"})
    const prodUpd2 = await productManager.getProductById(2)
    console.log(prodUpd2)

    await productManager.updateProduct(10,  {title: "Amiguris UPDATED 10"})
    const prodUpd10 = await productManager.getProductById(10)
    console.log(prodUpd10)

    await productManager.deleteProduct(3)
    await productManager.deleteProduct(8)
}


test();

