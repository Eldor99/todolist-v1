// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

// mongo db
mongoose.connect('mongodb+srv://admin-eldor:Panda1999.@cluster0.stja3.mongodb.net/todolistDB', {
    useNewUrlParser: true
}, {
    useUnifiedTopology: true
});

// mongoose schema
const itemSchema = new mongoose.Schema({
    name: String
});

// mogoose model
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: 'Fuck this shit'
});

const item2 = new Item({
    name: 'sleep'
});

const item3 = new Item({
    name: 'eat'
});

const defaultItems = [item1, item2, item3];

const ListSchema = {
	name: String,
	items: [itemSchema]
};

const List = mongoose.model("List", itemSchema);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    Item.find({}, (err, result) => {

        if (result.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('default items was added');
                }
            });
            res.redirect('/');
        } else {
            res.render('list', {
                listTitle: 'Today',
                newListItem: result
            });
        }
    });



});


app.get('/:customListName', (req, res) => {
	const customListName = req.params.customListName;

	List.findOne({name: customListName}, (err, foundList) => {
		if(!err){
			if(!foundList){
				// Create a new list
					const list = new List({
					name: customListName,
					items: defaultItems
				});

				list.save();
				res.redirect('/');
			}else{
				// Show an exist list
				res.render('list', {listTitle: foundList.name, newListItem: foundList.items})
			}
		}
	});



});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/', (req, res) => {
    const itemName = req.body.newItem;

    const item = new Item({
    	name: itemName
    });
   
   item.save();

   res.redirect('/');

})

app.post('/work', (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

app.post('/delete', (req,res)=>{
	const checkedItemId = req.body.checkbox;
	Item.findByIdAndRemove(checkedItemId, (err)=>{
		if(err){
			console.log(err);
		}else{
			console.log('successfuly deleted item');
			res.redirect('/');
		}
	});
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});