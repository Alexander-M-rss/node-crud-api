import { runServer } from './server';
import { config } from 'dotenv';

config();

const PORT = +(process.env.PORT || '4000');

runServer(PORT);
