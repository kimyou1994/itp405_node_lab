let express = require('express');
let knex = require('knex');

let app = express();

app.get('/api/artists', function(request, response) {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	});
	if (request.query.filter != null) {
		let condition = '%' + request.query.filter + '%';
 		connection.select().from('artists').where('Name', 'like', condition).then((artists) => {
			let changeName = artists.map(results =>{
				return {'id': results.ArtistId, 'name': results.Name}
			})
			response.json(changeName);
		})
	}else {
		connection.select().from('artists').then((artists) => {
			let changeName = artists.map(results =>{
				return {'id': results.ArtistId, 'name': results.Name}
			})
			response.json(changeName);
		})
	}
});
app.listen(8000);