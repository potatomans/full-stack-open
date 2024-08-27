const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET number of added todos. */
router.get('/statistics', async (_, res) => {
  const todosCount = await getAsync("added_todos") ?? 0;
  res.json({
    "added_todos": Number(todosCount)
  });
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  const todosCount = await getAsync("added_todos") ?? 0;
  await setAsync("added_todos", todosCount + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(405).send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
