<h1 align="center">Trackk 🐞</h1>

> UI greatly inspired from [Notion web app](https://www.notion.so/)

### Aboutx

<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/124808596-c17c0000-df7c-11eb-9c02-0b688cea4920.png" width='256' hspace="2">
  <img src="https://user-images.githubusercontent.com/67645175/124808847-16b81180-df7d-11eb-97dd-30db0db3b98e.png" width='256' hspace="2">
</p>

### Run the app locally

```
$ git clone git@github.com:arpitnath/spacex.git

$ npm install

$ npm start
```

> This will start the application and run on port 3000

#### For Production build

```
npm run build
```

### Structure

> App

```
public
└───index.html              # entry point
└───src                     # source
└───webpack                 # webpack setup
    └───webpack.common.js   # common webpack settings
    └───webpack.config.js   # webpack configuration point for dev and prod
    └───webpack.dev.js      # webpack dev setup
    └───webpack.prod.js     # webpack build setup for prod
└───.babelrc                # babel config
└───.eslintrc.json          # eslint config
└───.prettierrc.json        # prettier config
└───tsconfig.json           # typescript config
└───package.json
```

> src

```
src
└───index.tsx              # Application entry point
└───App.tsx                # Application routes and pages are managed
└───components/            # All the components live here
└───containers/            # encapsulate components as a single executable code block
└───constants/routes.ts    # Available Routes
└───pages/                 # Views of the App
└───styles/scss            # StyleSheets
    └───_mixins.scss       # all mixins
    └───_variables.scss    # scss/sass variables
    └───styles.module.scss # all styles endpoint
    └───index.scss         # global styles
└───utils
    defData.ts             # default data that hydrates the application on first load
    └───types.ts           # Typescript Types
    └───helpers.ts         # Shared Logic
```

> > To check the build size

```
//uncomment this part in webpack.prod.js

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
   ...
   plugins: [new BundleAnalyzerPlugin()]
}

```
