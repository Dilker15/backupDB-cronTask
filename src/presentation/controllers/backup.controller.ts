import {Request,Response} from 'express';
import { ValidateCreateBackup } from '../../domain/services/ValidateCreateBackup';
import { SqlServerStrategy } from '../../infraestructure/backups/SqlServerStrategy';
import { Backup } from '../../domain/usecases/Backup';
import { DtoCreateBackup } from '../../domain/dtos/DtoCreateBackup';


export class BackupController{

    constructor(){          //for dependency injection

    }


    createBackup = async(req:Request,res:Response)=>{
        try{
            const strategy:Backup = req.body.strategy;
            ValidateCreateBackup.validate(req.body);
            const dto:DtoCreateBackup = DtoCreateBackup.generate(req.body);
            const backupUrl:string = await strategy.execute(dto.user,dto.password,dto.database,dto.server);
            res.json(backupUrl);
        }catch(error){
            
            console.log(error);
            res.json({
                "error":(error as Error).message
            });
        }
    }





    getBackup = (req:Request,res:Response)=>{
        res.status(200).json("Get Backup");
    }


}