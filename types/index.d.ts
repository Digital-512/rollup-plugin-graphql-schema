import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'rollup';

export interface RollupGraphqlSchemaOptions {
    /**
     * All GraphQL files will be parsed by default,
     * but you can also specifically include files
     */
    include?: FilterPattern;
    /**
     * All GraphQL files will be parsed by default,
     * but you can also specifically exclude files
     */
    exclude?: FilterPattern;
    /**
     * The plugin will export GraphQLSchema object by default,
     * but you can enable exportAST to export AST schema instead
     */
    exportAST?: boolean;
}

/**
 * Convert .graphql files to ES6 modules
 */
export default function graphql(options?: RollupGraphqlSchemaOptions): Plugin;
