const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()
var bodyParser = require('body-parser')

router.get('/', async (req, res) => {
    // todos - массив всех задач
    const todos = await Todo.find({})
    // рендеринг страницы index
    res.render('index', {
        title: 'Todos',
        IsIndex: true,
        todos
    })
})

router.get('/support', (req, res) => {
    res.render('support', {
        title: 'Support page',
        IsSupport: true
    })
})

router.get('/problems', (req, res) => {
    res.render('problems', {
        title: 'Admin page',
        IsAdmin: true
    })
})
const urlencodedParser = bodyParser.urlencoded({extended: false})
router.post('/support', urlencodedParser, async(req, res) => {
    // создание нового объекта todo после обработки нажатия на кнопку
    if(!req.body) 
        return res.sendStatus(400); 
    const todo = new Todo({
        name: req.body.name,
        number: req.body.number,
        title: req.body.task
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', urlencodedParser, async(req, res) => {
    if(!req.body) 
        return res.sendStatus(400); 
    const todo = await Todo.findById(req.body.id)

    todo.completed = true
 //   await todo.save()

    res.redirect('/')
})

// экспортируем роутер
module.exports = router