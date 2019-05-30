import elasticsearch from 'elasticsearch';
import { graphql, ObjectTypeComposer } from 'graphql-compose';
import { composeWithElastic, elasticApiFieldConfig } from 'graphql-compose-elasticsearch';
import { elasticSearchPort } from '../config';

const { GraphQLSchema, GraphQLObjectType } = graphql;

// Mapping obtained from ElasticSearch server
// If you have an existing index in ES you may load mapping via
//   GET http://user:pass@localhost:9200/projects/_mapping
//   and then get subtree of returned document which contains
//   properties definitions (which looks like following data):
const demoProjectMapping = {
  properties: {
    name: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
        },
      },
    },
    start: {
      type: 'date',
    },
    end: {
      type: 'date',
    },
    roles: {
      properties: {
        filled: {
          type: 'integer',
        },
        unfilled: {
          type: 'integer',
        },
      },
    },
    status: {
      type: 'text',
    },
    issues: {
      type: 'integer',
    },
    notes: {
      type: 'text',
    },
    address: {
      type: 'text',
    },
    buildType: {
      type: 'text',
    },
  },
};

const ProjectsEsTC = composeWithElastic({
  graphqlTypeName: 'ProjectsES',
  elasticIndex: 'projects',
  elasticType: 'projects',
  elasticMapping: demoProjectMapping,
  elasticClient: new elasticsearch.Client({
    host: `http://localhost:${elasticSearchPort}`,
    apiVersion: '5.6',
    log: 'trace',
  }),
});

const ProxyTC = ObjectTypeComposer.createTemp('type ProxyDebugType { source: JSON }');
ProxyTC.addResolver({
  name: 'showArgs',
  kind: 'query',
  args: {
    source: 'JSON',
  },
  type: 'ProxyDebugType',
  resolve: ({ args }) => args,
});

// ProjectsEsTC.addRelation('showRelationArguments', {
//   resolver: () => ProxyTC.getResolver('showArgs'),
//   prepareArgs: {
//     source: source => source,
//   },
//   projection: {
//     name: true,
//     salary: true,
//   },
// });

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      projectsSearch: ProjectsEsTC.getResolver('search').getFieldConfig(),
      projectsSearchConnection: ProjectsEsTC.getResolver('searchConnection').getFieldConfig(),
      elastic50: elasticApiFieldConfig({
        host: `http://user:pass@localhost:${elasticSearchPort}`,
        apiVersion: '5.6',
        log: 'trace',
      }),
    },
  }),
});

export default schema;
