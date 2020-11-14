// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js');

const app = express();
const port = 3000;
const items= [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/', (req,res) =>{

	const day = date();

	res.render('list', {listTitle: day, newListItem: items});

});


app.get('/work', (req,res) => {
	res.render('list', {listTitle: 'Work List', newListItem: workItems});
});

app.get('/about', (req,res) => {
	res.render('about');
});

app.post('/', (req,res)=>{
	const item = req.body.newItem;
	if(req.body.list === 'Work'){
		workItems.push(item);
		res.redirect('/work');
	}else{
		items.push(item);	
		res.redirect('/');
	}
})

app.post('/work',(req,res)=>{
	const item = req.body.newItem;
	workItems.push(item);
	res.redirect('/work');
});

app.listen(port, ()=>{
	console.log('Server started on port ' + port);
});
