install:
	@npm install -d;

run:
	@env-cmd config/dev.json webpack-dev-server;

build-ci:
	@env-cmd config/ci.json webpack --config webpack.config.js --progress --profile --colors;

build-live:
	@env-cmd config/prod.json webpack --config webpack.config.js --progress --profile --colors;

deploy-ci:build-ci
	@rsync -e "ssh -p 22" -rvz --delete dist/ ubuntu@10.16.15.132:/var/www/dolphin/ci/;

pre-deploy:build-ci
	@http-server ./dist;
