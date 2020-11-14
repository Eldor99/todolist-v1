// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;


app.set('view engine','ejs');

app.get('/', (req,res) =>{

	let today = new Date();
	let currentDay = today.getDay();
	let day = '';

	switch (currentDay) {
		case 0:
			day = 'Sunday';
			break;
		case 1:
			day = 'Monday';
			break;
		case 2:
			day = 'Tuesday';
			break;
		case 3:
			day = 'Wednesday';
			break;
		case 4:
			day = 'Thursday';
			break;
		case 5:
			day = 'Friday';
			break;
		case 6:
			day = 'Saturday ';
			break;
		default:
			day = '';
			break;
	}

		res.render('list', {kindOfDay: day});

});

app.listen(port, ()=>{
	console.log('Server started on port ' + port);
});
