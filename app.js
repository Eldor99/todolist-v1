// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;
let items= [];
let workItems = [];

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

	res.render('list', {listTitle: day, newListItem: items});

});


app.get('/work', (req,res) => {
	res.render('list', {listTitle: 'Work List', newListItem: workItems});
});

app.get('/about', (req,res) => {
	res.render('about');
});

app.post('/', (req,res)=>{
	let item = req.body.newItem;
	if(req.body.list === 'Work'){
		workItems.push(item);
		res.redirect('/work');
	}else{
		items.push(item);	
		res.redirect('/');
	}
})

app.post('/work',(req,res)=>{
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect('/work');
});

app.listen(port, ()=>{
	console.log('Server started on port ' + port);
});
