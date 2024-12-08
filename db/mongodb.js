const mongoose = require('mongoose')

// Evento de mongoose, solo lo utilizaremos para informar que se ha conectado
mongoose.connection.on('open', () => console.log('db connected'))

async function connectDb ({ host, port, dbName }) {
    const uri = `mongodb://${host}:${port}/${dbName}`
    await mongoose.connect(uri)
}

module.exports = connectDb