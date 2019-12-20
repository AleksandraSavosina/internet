// подключение пакетов
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
// подключение router
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 7000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//  регистрируем движок для рендеринга страниц
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
// 
app.use(todoRoutes)
app.use(express.urlencoded({ extended: true }))
// для подключения css:
app.use(express.static(path.join(__dirname, 'public'))) // don't work
// app.use(express.static(__dirname + 'public'))

async function start() {
    try {
      await mongoose.connect(
          'mongodb+srv://sasha:1q2w3e4r@cluster0-wlau1.mongodb.net/todos', {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        })
      app.listen(PORT, () => {
        console.log('Server run ...')
      })
    } catch (e) {
      console.log(e)
    }
  }

  start()