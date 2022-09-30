class APIproductos{

    constructor(){
        this.productos = []
        this.id = 0
    }

    getAll(){
        return [...this.productos]
    }

    getById(id){
        const producto = this.productos.find(e => e.id == id)
        return producto || {error: "Producto no encontrado"}
    }

    add(p){
        const producto = {...p, id: ++this.id}
        this.productos.push(producto)
        return producto
    }

    update(p, id){
        const ref = this.productos.find(e => e.id === id)
        const i = this.productos.findIndex(e => e.id === id)
        if(ref){
            const producto = {...p, id: id}
            this.productos[i] = producto
        }else{
            return {error: "No se encontró el producto a actualizar"}
        }
    }

    deleteById(id){
        const products = this.productos.filter(e => e.id != id)
        this.productos = products
    }

    deleteAll(){
        this.productos = []
    }

}

export default APIproductos