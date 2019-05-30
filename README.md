### `yarn install`

Installs the project's dependencies.

### `yarn start`

Runs the service. Starts the Elasticsearch server, seeds mock data and starts the GraphQL server.<br>

The service expects the `ELASTICSEARCH_BIN_PATH` variable to be set and to contain the path to the Elasticsearch binary.

### `yarn start:graphql`

Starts just the GraphQL server.

### `yarn seed`

Seeds mock data into a running Elasticsearch instance.

### Default ports

* Elasticsearch: 9200
* GraphQL: 9201

Default ports can be overridden by setting the `ELASTICSEARCH_PORT` and `GRAPHQL_PORT` environment variables.