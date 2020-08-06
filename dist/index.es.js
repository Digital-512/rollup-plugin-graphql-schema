import { createFilter } from '@rollup/pluginutils';
import { parse, printSchema } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

function graphql(options) {
    if ( options === void 0 ) options = {};

    // path filter
    var filter = createFilter(options.include, options.exclude);
    // only .graphql and .gql files
    var filterExt = /\.(graphql|graphqls|gql|gqls)$/i;

    return {
        name: "graphql",

        // eslint-disable-next-line no-shadow
        transform: function transform(source, id) {
            if (!filterExt.test(id) || !filter(id)) { return null; }

            // load schema from file as GraphQLSchema object
            var schemaFile = loadSchemaSync(id, {
                loaders: [new GraphQLFileLoader()]
            });

            var EXPORT = null;

            // convert schema into AST
            var parsed = JSON.stringify(
                parse(printSchema(schemaFile), { noLocation: true })
            );

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
                map: { mappings: "" }
            };
        }
    };
}

export default graphql;
//# sourceMappingURL=index.es.js.map
