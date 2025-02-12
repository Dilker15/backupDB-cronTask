import { Router } from "express";
import { BackupController } from "../controllers/backup.controller";
import { Verify } from "crypto";
import { verifyStrategyMiddlewares } from "../../domain/middlewares/verifyStrategyMiddleware";



export class BackupRoutes {

    static startRoutes():Router{
        const router = Router();
        const bController = new BackupController();
        router.post('/',verifyStrategyMiddlewares,bController.createBackup);
        router.get('/',bController.getBackup);


        return router;
    }


}