import { IBackup } from "../../domain/interfaces/Ibackup";
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { SaveFileBackup } from "../../domain/usecases/SaveBackupUsecase";

const execPromise = promisify(exec);



export class SqlServerStrategy implements IBackup {
    private backupDir: string;

    constructor() {
        this.backupDir = 'C:\\SQLBackups';
        this.ensureBackupDirectoryExists();
    }

    private ensureBackupDirectoryExists() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }


    private validateInputs(dbname: string, serverName: string) {
        if (!dbname) throw new Error('Db Name is missing');
        if (!serverName) throw new Error('ServerName is missing');
    }


    async generateBackup(user: string = '', password: string = '', dbname: string, serverName: string): Promise<string> {
        try {
            this.validateInputs(dbname, serverName);
            const timestamp = Math.floor(Date.now() / 1000);
            const backupFileName = `${dbname}_${timestamp}.bak`;
            const backupPath = path.join(this.backupDir, backupFileName);
            const backupPathFormatted = backupPath.replace(/\\/g, '\\\\');
            

            const scriptPath = path.join(this.backupDir, 'backup_script.sql');
            const backupScript = `BACKUP DATABASE [${dbname}] TO DISK = N'${backupPathFormatted}' WITH INIT, FORMAT`;
            fs.writeFileSync(scriptPath, backupScript);
            const command = `sqlcmd -S "${serverName}" -E -i "${scriptPath}"`;
            const { stdout, stderr } = await execPromise(command);
            fs.unlinkSync(scriptPath);
            
            if (stderr) {
                console.error('Error en stderr:', stderr);
                throw new Error(stderr);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            if (!fs.existsSync(backupPath)) {
                throw new Error(`El archivo de backup no se creó en: ${backupPath}`);
            }
           
            const file = await SaveFileBackup.upload(backupPath);
            console.log("Backup SqlServer ok");
            return file.secureUrl;

        } catch (error) {
            console.error('Error detallado del backup:', error);
            
            if (error instanceof Error) {
                throw new Error(`Error al generar el backup: ${error.message}`);
            }
            throw new Error('Error desconocido al generar el backup');
        }
    }
}