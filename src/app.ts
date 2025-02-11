import dotenv from 'dotenv'
dotenv.config();

import { Backup } from "./domain/usecases/Backup";
import { SqlServerStrategy } from './infraestructure/backups/SqlServerStrategy';
import { PostgresStrategy } from './infraestructure/backups/PostgresStrategy';



const contextBackup = new Backup(new PostgresStrategy());
contextBackup.execute('postgres','postgres123','shorten_url','localhost');



contextBackup.setStrategy(new SqlServerStrategy());
contextBackup.execute('BNTB125\dilker', '', 'supermarket', 'localhost');

