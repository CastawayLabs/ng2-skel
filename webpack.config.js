/**
 * Webpack configuration
 */

const {
	CommonsChunkPlugin,
	UglifyJsPlugin,
	DedupePlugin,
} = require('webpack').optimize;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IndexHtml = new ExtractTextPlugin('index.html');
const RootCss = new ExtractTextPlugin('root.css');

const autoprefixer = require('autoprefixer');

module.exports = (function webpackConfig() {
	const config = {
		production: _e(),
	};

	config.entry = {
		main: './src/main.ts',
		common: ['./src/vendor.ts', './src/index.pug', './src/root.scss'],
	};

	config.output = {
		path: './dist/',
		filename: '[name].js',
		chunkFilename: '[name].chunk[id].js',
	};

	config.resolve = {
		root: './src/',
		extensions: ['', '.ts', '.js', '.pug', '.scss'],
	};

	config.devtool = 'source-map';

	config.module = {loaders: [
		// *.component.ts is passed through ng2-component loader which inlines the
		// compiled pug templates and scss styles
		{test: _p('ts', 'component', ''), loader: 'ts!ng2-component'},
		{test: _p('ts'), loader: 'ts',
			exclude: [_p('ts', 'component', ''), _p()]}, // regular ts files

		// index.pug is compiled and written to dist/index.html
		{test: _p('pug', 'index'), loader: IndexHtml.extract('pug-html')},
		{test: _p('pug'), loader: 'pug-html',
			exclude: [_p('pug', 'index')]}, // pug templates for ng2-component loader

		// root.scss is compiled and written to dist/root.css
		{test: _p('scss', 'root'), loader: RootCss.extract('css!postcss!sass')},
		{test: _p('scss'), loader: 'raw!postcss!sass',
			exclude: [_p('scss', 'root'), _p()]}, // styles for ng2-component loader

		// see IMPORTANT comment in src/include/variables.scss
		{test: /fonts\/.*(eot|svg|ttf|woff2?)(\?v=\d\.\d\.\d)?$/,
			loader: 'file?name=fonts/[name].[ext]'},
	]};

	config.plugins = [
		new CommonsChunkPlugin({
			name: ['common'], // contains vendor files etc.
			filename: '[name].js',
		}),

		IndexHtml, // ExtractTextPlugin instance for index.html
		RootCss, // ExtractTextPlugin instance for root.css
	];

	if (config.production) {
		config.plugins.push(
			new UglifyJsPlugin({
				compress: {warnings: false},
				comments: false,
			}),

			new DedupePlugin()
		);
	}

	config.ts = {
		silent: true, // stfu ts-loader! nobody wants to know TypeScript version
	};

	if (config.production)
		config.ts.silent = false;

	config.sassLoader = {
		includePaths: ['./node_modules'], // see IMPORTANT comment in src/root.scss
	};

	config.postcss = () => [
		autoprefixer({browsers: ['last 2 versions']}),
	];

	config.stats = {
		children: false,
	};

	return config;
})();

// Generates RegExps
function _p(ext, ...args) {
	if (!ext)
		return /node_modules/;

	if (!args.length)
		return new RegExp(`\\.${ext}$`);

	let r = args.reduce((r, v) => v + '\\.' + r, '');
	return new RegExp(`${r}${ext}$`);
}

// Checks if running in production mode
function _e(env = process.env.NODE_ENV || 'dev') {
	return Boolean(String(env).match(/^prod(uction)?$/i));
}
