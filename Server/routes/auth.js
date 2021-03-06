var jwt = require('jsonwebtoken');

var authMiddleWare = {
	isAuthenticated(req, res, next) {
		if (req.session.user)
			return next();

		res.status(401).send('UNAUTHORIZED ACCESS');
	},
	isAdmin(req, res, next) {
		if (req.session.user)
			if(req.session.user.admin)
				return next();
	
		res.status(401).send('UNAUTHORIZED ACCESS');
	},


	isAuthenticatedJWT(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, 'samsarcom', function(err, decoded) {      
				if (err) {
					return res.send({ success: false, message: 'Failed to authenticate token.' });    
				} else {
					req.decoded = decoded;    
					next();
				}
			});
		} else {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		}
	}
};
module.exports = authMiddleWare;