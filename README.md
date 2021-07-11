<h1 align="center">Trackk 🐞</h1>

> UI greatly inspired from [Notion web app](https://www.notion.so/)

<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203109-b387f100-e294-11eb-921e-24a75273155a.png" width='512' hspace="1">
</p>

### About

A Single Page Web App for tracking your daily tasks and goal.

> App uses Local Storage to store your data.

⌗ create a new group

⌗ create a new task

⌗ edit a group name

⌗ add tasks to the groups

⌗ drag tasks to different group or shuffle them inside the same

⌗ edit the task title in the board or open the task and edit it

⌗ add a task description

⌗ add tags to the task or remove them

⌗ edit the board title or description

<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203302-796b1f00-e295-11eb-99f9-67236c969813.png" width='512' hspace="1">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203526-542ae080-e296-11eb-88b0-cdd388775ac8.png" width='512' hspace="1">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203132-d74b3700-e294-11eb-83bb-941227dd6df3.png" width='256' hspace="2">
  <img src="https://user-images.githubusercontent.com/67645175/125203205-2729fe00-e295-11eb-817a-973e9cecb758.png" width='256' hspace="2">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203240-445ecc80-e295-11eb-89cb-1d2299d7a291.png" width='256' hspace="2">
  <img src="https://user-images.githubusercontent.com/67645175/125203268-5c365080-e295-11eb-8076-36505bb5ae3a.png" width='256' hspace="2">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203326-90117600-e295-11eb-9f33-d437dd694fe6.png" width='256' hspace="2">
  <img src="https://user-images.githubusercontent.com/67645175/125203344-a3bcdc80-e295-11eb-82ed-f5c32259facc.png" width='256' hspace="2">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/67645175/125203557-715faf00-e296-11eb-9974-b7d2f01a524a.png" width='256' hspace="3">
  <img src="https://user-images.githubusercontent.com/67645175/125203578-8c322380-e296-11eb-8af8-d9e8f8315cd7.png" width='256' hspace="3">
  <img src="https://user-images.githubusercontent.com/67645175/125203586-9a803f80-e296-11eb-9113-2b3ba1741b92.png" width='256' hspace="3">
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
└───__test__                # unit tests
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
└───tsconfig.testing.json   # ts test config
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
    └───defData.ts         # default data that hydrates the application on first load
    └───types.ts           # Typescript Types
    └───helpers.ts         # Shared Logic
    labels.ts              # default data for labels
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
