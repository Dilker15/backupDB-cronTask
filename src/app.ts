import dotenv from 'dotenv'
dotenv.config();
import { PostgresStrategy } from "./infraestructure/backups/PostgresStrategy";


import { Backup } from "./domain/usecases/Backup";

const contextBackup = new Backup(new PostgresStrategy());
contextBackup.execute('postgres','postgres123','shorten_url','localhost');

