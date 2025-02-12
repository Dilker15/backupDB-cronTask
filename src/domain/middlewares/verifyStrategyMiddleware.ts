import { NextFunction,Request,Response } from "express";
import { Backup } from "../usecases/Backup";
import { PostgresStrategy } from "../../infraestructure/backups/PostgresStrategy";

import { SqlServerStrategy } from "../../infraestructure/backups/SqlServerStrategy";
import { MongoStrategy } from "../../infraestructure/backups/MongoStrategy";




export const verifyStrategyMiddlewares = (req:Request,res:Response,next:NextFunction)=>{

    const strategyType = req.body.strategy;
    let strategy:Backup = new Backup(new PostgresStrategy());
     
    switch(strategyType){

        case 'sqlserver':{
           strategy.setStrategy(new SqlServerStrategy());
           break;
        }
        case 'mongo':{
            strategy.setStrategy(new MongoStrategy());
            break;
        }
        default:{
           console.log("By default strategy is Postgres SQL"); 
           
        }
    }

    req.body.strategy = strategy;
    next();


}