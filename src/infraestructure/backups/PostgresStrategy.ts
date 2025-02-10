import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { IBackup } from '../../domain/interfaces/Ibackup';
import { SaveFileBackup } from '../../domain/usecases/SaveBackupUsecase';
const execPromise = promisify(exec);




export class PostgresStrategy implements IBackup{

    constructor(){

    }

    async generateBackup(user: string, password: string, dbname: string,serverName:string): Promise<string> {
      try {
          const backupPath = join(process.cwd(), 'backups', `${dbname}_postgres_${Date.now()}.backup`);
          const env = {
              ...process.env,
              PGPASSWORD: password,
              PGUSER: user,
              PGDATABASE: dbname,
              PGHOST: serverName
          };
          const command = `pg_dump --format=custom --file="${backupPath}"`;
          const { stdout, stderr } = await execPromise(command, { 
              env,
          });

          if (stderr && !stderr.includes('warning')) {
              console.error('Error durante el backup:', stderr);
              throw new Error(stderr);
          }
          console.log(`Backup Successfully: ${backupPath}`);
          SaveFileBackup.upload(backupPath);
          return `Backup completado exitosamente en: ${backupPath}`;
      } catch (error) {
          console.error('Error en generateBackup:', error);
          
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          throw new Error(`Error al generar el backup: ${errorMessage}`);
      }

  }
  


}


