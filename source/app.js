'use strict';
const _ = require('lodash');
const { Fpm } = require('yf-fpm-server');
const path = require('path');
const Views = require('koa-views');
const Static = require('koa-static');

/* The Start: Create Fpm Server */
const fpm = new Fpm();

const biz = fpm.createBiz('0.0.1');

biz.addSubModules('test', {});

fpm.addBizModules(biz);

const LOCAL = path.join(__dirname, '../');

const { app } = fpm;

app.use(Views(path.join(LOCAL, 'views'), {
		extension: 'html',
		map: { html: 'nunjucks' },
}))

app.use(Static(path.join(LOCAL, 'public')));


const router = fpm.createRouter();

router.get('/', async ctx => {
	try{
		const { storage = 'disk' } = fpm.getConfig('schedule', { storage: 'disk' } )
		await ctx.render('index.html', { storage, });
	}catch(e){
		const showError = fpm.get('debug') === true ? {error: e.toString()} : {};
		await ctx.render('404.html', showError);
	}
});

router.get('/:page', async ctx => {
	try{
		let { page } = ctx.params;
		if(page.indexOf('.')>0){
			return;
		}
		page = page.replace(/-/g, '/')
		await ctx.render(`${page}.html`);
	}catch(e){
		console.error(e.toString());
		const showError = fpm.get('debug') === true ? {error: e.toString()} : {};
		await ctx.render('404.html', showError);
	}
});

fpm.bindRouter(router);

fpm.subscribe('#cronjob/done', (topic, message) => {
	console.log(topic, message)
})

fpm.subscribe('#cronjob/error', (topic, message) => {
	console.log(topic, message)
})

fpm.run()
	.then(fpm => { 
    fpm.set('debug', true);
    const { storage } = fpm.getConfig('schedule');
    if(storage === 'disk'){
      return;
    }
	});