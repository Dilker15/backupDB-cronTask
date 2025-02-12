import { Router } from "express";
import { BackupRoutes } from "./routes/backups.route";


export class AppRoutes{


    static startRoutes():Router{
        const router = Router();
        router.use('/api/backups',BackupRoutes.startRoutes());

        return router;
    }


}