import Express from "express"
import * as hbs from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from "url"
import APIproductos from './Modules/products.js'

const app = Express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const api = new APIproductos()

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir:__dirname+'/views/partials',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout:'layout.hbs'
}))
app.set('views', './views')
app.set('view engine', 'hbs')

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