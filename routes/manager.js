const apply = (app, component) => {
	component.routes.forEach((route) => {
		if (route.uri.constructor.name !== 'Array') route.uri = [route.uri];
		if (route.methods.constructor.name !== 'Array') route.methods = [route.methods];
		if (route.handler.constructor.name !== 'Array') route.handler = [route.handler];
		route.methods.forEach((method) => {
			route.uri.forEach((uri) => {
				app[method](route.uri, ...route.handler);
				if(component.logger) component.logger.info(`Adding route: ${method.toLocaleUpperCase()} ${route.uri}`);
			});
		});
	});
};


module.exports = { apply };
