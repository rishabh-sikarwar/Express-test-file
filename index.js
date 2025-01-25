import express from "express";

const app = express();

const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/order", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/orderReceive", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get('/orderReceive/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/orderReceive/:id', (req, res) => {
     const tea = teaData.find((t) => t.id === parseInt(req.params.id));

     if (!tea) {
       return res.status(404).send("Tea not found");
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})


//delete tea
app.delete('/orderReceive/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
  
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index , 1)
    return res.status(200).send( `Deleted at: ${index}`)
})















app.get("/", (req, res) => {
  res.send("hello , giving respond!");
});
app.get("/about", (req, res) => {
  res.send("hello , this is about section");
});
app.get("/twitter", (req, res) => {
  res.send("hello , this goes to the twitter page");
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}....`);
});
