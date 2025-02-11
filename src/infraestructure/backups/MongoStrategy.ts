import { IBackup } from "../../domain/interfaces/Ibackup";
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execPromise = promisify(exec);

export class MongoStrategy implements IBackup {
    private backupDir: string;

    constructor(backupDir: string = 'backups') {
        this.backupDir = backupDir;
        this.ensureBackupDirectoryExists();
    }

    private ensureBackupDirectoryExists() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    async generateBackup(user: string, password: string, dbname: string, serverName: string): Promise<string> {
        try {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const backupPath = path.join(this.backupDir, `backup-${timestamp}`);

            const mongoUri = `mongodb://${user}:${password}@${serverName}:27017/${dbname}`;
            const command = `mongodump --uri="${mongoUri}" --out="${backupPath}"`;
      
            const { stdout, stderr } = await execPromise(command);
      
            if (stderr) {
                throw new Error(stderr);
            }
            console.log("Backup successful");
            return `Backup completed at: ${backupPath}`;
        } catch (error) {
            console.error("Backup failed");
            throw new Error(`Error generating backup: ${error instanceof Error ? error.message : ""}`);
        }
    }
}