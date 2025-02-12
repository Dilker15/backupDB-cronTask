import dotenv from 'dotenv'
dotenv.config();
import { Server } from './presentation/Server';



const ser = new Server();



/*const contextBackup = new Backup(new PostgresStrategy());
contextBackup.execute('postgres','postgres123','shorten_url','localhost');*/



/*contextBackup.setStrategy(new SqlServerStrategy());
contextBackup.execute('BNTB125\dilker', '', 'supermarket', 'localhost');*/

