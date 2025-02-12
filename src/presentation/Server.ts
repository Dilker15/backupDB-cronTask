import exp from 'constants';
import express,{Application} from 'express';
import cors from 'cors';
import { AppRoutes } from './AppRoutes';



export class Server{

    private port:number;
    private app:Application;


    constructor(){
        const x  = process.env.PORT
        if(!x){
            throw Error("Port is missing");
        }

        this.port = parseInt(x);
        this.app = express();
        this.startMiddlewares();
        this.startServer();
        this.startRoutes();
       

    }


    private startMiddlewares():void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors());
    }




    private startServer():void{
        this.app.listen(this.port,()=>{
            console.log("Server Started on Port : ",this.port);
        });
    }



    private startRoutes():void{
        this.app.use(AppRoutes.startRoutes());
    }






}