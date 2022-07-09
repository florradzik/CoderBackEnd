const mongoose = require('mongoose');


class ContenedorMongo {
constructor(uri){
    this.mongo = mongoose;
    this.mongo = mongoose.connect(uri, {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
        .then(db => console.log('DB is connected'))
        .catch(err => console.log(err))
}


Model() {
    return this.mongo.model('productos', this.Schema())
}

Read() {
    return this.Model(),find({})
}

async save(obj) {
    const newProduct = new PrdocutModel(obj);
    await newProduct.save()
    return newProduct

}

getByID(id){
    return ProductModel.find({_id: new ObjectId(id)})
}

getAll(id){
    return ProductModel.find({})
}

editById (obj, id){
const objUpdate = await model.ProductModel.updateOne({
    _id: new ObjectId(id)
},
{$set:obj})

return objUpdate
}

}