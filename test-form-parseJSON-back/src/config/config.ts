import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  general: {
    isDevmode: process.env.NODE_ENV !== 'production',
  },
  db: {
    poolMaxConn: parseInt(process.env.DB_POOL_MAX_CONN ?? '5'),
  },
};
