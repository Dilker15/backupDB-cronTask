



export class ValidateCreateBackup{


    static validate(body:{[key:string]:any}){
         if(!body.user){
            throw Error('User is missing');
         }
         if(!body.database){
            throw Error ('Database name is missing');
         }

         if(!body.server){
            throw Error ('Server name is missing');
         }

    }


}