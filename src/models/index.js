// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TrailerRCJ } = initSchema(schema);

export {
  TrailerRCJ
};