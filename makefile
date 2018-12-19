export PATH := $(realpath .)/node_modules/.bin:$(PATH)

install:
	@npm install -d;

run:
	@env-cmd config/dev.json webpack-dev-server --progress;

build-ci:
	@env-cmd config/ci.json webpack --config webpack.config.js --progress --profile --colors;

build-live:
	@env-cmd config/prod.json webpack --config webpack.config.js --progress --profile --colors;

pre-deploy:build-ci
	@http-server ./dist;

dll:
	@webpack --config webpack.dll.config.js
