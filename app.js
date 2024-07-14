var express = require("express");
var fs = require("fs");
var parser = require("body-parser");
var app = express();
const dataFilePath = "./data.json";

app.use(parser.json());

const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get("/api/user", (req, res) => {
  const data = readData();
  res.json(data.items);
});

app.get("/api/user/:id", (req, res) => {
  var data = readData();
  var datafind = data.items.find((i) => i.id == req.params.id);
  if (datafind) {
    res.send(datafind);
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});
var cnt = 2;
// app.post("/api/user/", (req, res) => {
//   var data = readData();
//   const newItem = {
//     name: req.body.name,
//     age: req.body.age,
//     adress: req.body.adress,
//     id: cnt++
//   };

//   data.push(newItem);
//   writeData(data);
//   res.status(201).json(newItem);
// });

app.post('/api/user', (req, res) => {
  const data = readData();
    const newItem = {
        id: data.currentId + 1,
        name: req.body.name,
        age: req.body.age,
        adress: req.body.adress,
    };
    data.currentId = newItem.id;
    data.items.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

console.log("aaa");

app.put("/api/user/:id", (req, res) => {
  var data = readData();
  

  var index = data.items.findIndex((data) => data.id == parseInt(req.params.id));
  if(index == -1){
    res.status(404).send({message: "NOT FOUND ID"});
  } else{
    const updateItem = {
      name: req.body.name,
      age: req.body.age,
      adress: req.body.adress,
      id: data.items[index].id,
    };
    data.items[index] = updateItem;
    writeData(data);
    res.send(updateItem);
    }
});

app.delete('/api/user/:id' , (req, res) =>{
  var data = readData();
  var newItems = data.items.filter((data)  => data.id != parseInt(req.params.id));
  if(newItems.length != data.items.length){
    data.items = newItems;
    writeData(data);
    res.send({message : "Item deleted!"});
  } else{
    res.status(404).send({message: "Item not found!"});
  }
})

app.listen(3000, () => console.log("http://localhost:3000"));
