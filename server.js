const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/angular-moneydefender'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/angular-moneydefender/index.html'));
});

app.set('port', process.env.PORT || 4200);

app.listen(app.get('port'), () => {
	console.log('Server init on port:' + app.get('port'));
});