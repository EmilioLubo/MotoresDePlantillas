import Express from "express"
import APIproductos from './Modules/products.js'

const app = Express()

const api = new APIproductos()

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) =>{
    res.render('index')
})
app.post('/', (req, res) => {
    const newProduct = req.body
    api.add(newProduct)
    res.status(300).redirect('/')
})
app.get('/productos', (req, res) => {
    const productos = api.getAll()
    res.status(200).render('main', {productos})
})

const PORT = 8080
app.listen(PORT, err => {
    err ? console.log(err) :
    console.log(`listening on port ${PORT}`)
})