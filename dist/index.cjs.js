'use strict';

var pluginutils = require('@rollup/pluginutils');
var graphql$1 = require('graphql');
var load = require('@graphql-tools/load');
var graphqlFileLoader = require('@graphql-tools/graphql-file-loader');

function graphql(options) {
    if ( options === void 0 ) options = {};

    // path filter
    var filter = pluginutils.createFilter(options.include, options.exclude);
    // only .graphql and .gql files
    var filterExt = /\.(graphql|graphqls|gql|gqls)$/i;

    return {
        name: 'graphql',

        // eslint-disable-next-line no-shadow
        transform: function transform(source, id) {
            if (!filterExt.test(id) || !filter(id)) { return null; }

            // load schema from file as GraphQLSchema object
            var schemaFile = load.loadSchemaSync(id, {
                loaders: [
                    new graphqlFileLoader.GraphQLFileLoader()
                ]
            });

            var EXPORT = null;

            // convert schema into AST
            var parsed = JSON.stringify(graphql$1.parse(graphql$1.printSchema(schemaFile)));

            if (options.exportAST) {
                // export only AST
                EXPORT = "export default " + parsed;
            } else {
                // export GraphQLSchema object
                EXPORT = "import { buildASTSchema } from 'graphql';";
                EXPORT += "export default buildASTSchema(" + parsed + ");";
            }

            return {
                code: EXPORT,
                map: { mappings: '' }
            }
        }
    }
}

module.exports = graphql;
//# sourceMappingURL=index.cjs.js.map
