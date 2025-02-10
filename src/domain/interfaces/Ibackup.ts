



export interface IBackup {

    generateBackup(user:string,password:string,dbname:string,serverName:string):Promise<string>;

}