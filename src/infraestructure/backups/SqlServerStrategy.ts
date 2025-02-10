
import { IBackup } from "../../domain/interfaces/Ibackup";
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);




export class SqlServerStrategy implements IBackup{

    constructor(){

    }

    async generateBackup(user:string,password:string,dbname:string): Promise<string> {
        try {
            const command = `sqlcmd -S localhost -U ${user} -P ${password} -Q "BACKUP DATABASE ${dbname} TO DISK='/backups/test'"`;
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