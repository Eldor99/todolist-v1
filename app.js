// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;
let items= [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/', (req,res) =>{

	let today = new Date();

	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	};

	let day = today.toLocaleDateString('en-US', options);

	res.render('list', {kindOfDay: day, newListItem: items});

});


app.post('/', (req,res)=>{
	let item = req.body.newItem;

	items.push(item);

	res.redirect('/');
})

app.listen(port, ()=>{
	console.log('Server started on port ' + port);
});
