import { createFilter } from "@rollup/pluginutils";
import { parse, printSchema } from "graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export default function graphql(options = {}) {
    // path filter
    const filter = createFilter(options.include, options.exclude);
    // only .graphql and .gql files
    const filterExt = /\.(graphql|graphqls|gql|gqls)$/i;

    return {
        name: "graphql",

        // eslint-disable-next-line no-shadow
        transform(source, id) {
            if (!filterExt.test(id) || !filter(id)) return null;

            // load schema from file as GraphQLSchema object
            const schemaFile = loadSchemaSync(id, {
                loaders: [new GraphQLFileLoader()]
            });

            let EXPORT = null;

            // convert schema into AST
            const parsed = JSON.stringify(
                parse(printSchema(schemaFile), { noLocation: true })
            );

            if (options.exportAST) {
                // export only AST
                EXPORT = `export default ${parsed}`;
            } else {
                // export GraphQLSchema object
                EXPORT = `import { buildASTSchema } from 'graphql';`;
                EXPORT += `export default buildASTSchema(${parsed});`;
            }

            return {
                code: EXPORT,
                map: { mappings: "" }
            };
        }
    };
}
