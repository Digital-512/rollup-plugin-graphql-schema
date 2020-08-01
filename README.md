# rollup-plugin-graphql-schema

🍣 A Rollup plugin which converts .graphql files to ES6 modules.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install rollup-plugin-graphql-schema --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import graphql from 'rollup-plugin-graphql-schema';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [graphql()]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

With an accompanying file `src/index.js`, the local `schema.graphql` file would now be importable as seen below:

```js
// src/index.js
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// import schema.graphql file
import schema from './schema.graphql';

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

You can also use imports in .graphql files to modularize them:

```graphql
# import Post from "posts.graphql"

type Query {
  posts: [Post]
}
```

For more information about imports, see [Using #import expression](https://www.graphql-tools.com/docs/schema-loading#using-import-expression).

## Options

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

### `exportAST`
Type: `boolean`<br>
Default: `false (null)`

The plugin will export GraphQLSchema object by default, but you can enable exportAST to export AST schema instead.
