import { IBackup } from "../../domain/interfaces/Ibackup";
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);




export class MongoStrategy implements IBackup{

    constructor(){

    }

    async generateBackup(user:string,password:string,dbname:string): Promise<string> {
        try {
          
            const mongoUri = `mongodb://${user}:${password}@localhost:27017/${dbname}`;
    
            const command = `mongodump --uri="${mongoUri}" --out="${'backup/test'}"`;
      
            const { stdout, stderr } = await execPromise(command);
      
            if (stderr) {
              throw new Error(stderr);
            }
      
            return `Backup completed successfully: ${stdout}`;
          } catch (error) {
            throw new Error(`Error generating backup: ${error instanceof Error ?error.message:""}`);
          }
    }


}