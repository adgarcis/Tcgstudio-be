import {juggler} from '@loopback/repository';

const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: process.env.MONGO_URL || '',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
};

export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo';
  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}