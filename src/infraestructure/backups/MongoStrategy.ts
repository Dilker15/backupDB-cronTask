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
        return "Mongo Backup Created";
    }
}