

import { s3_client } from "../config/S3Cliente";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import { v4 } from "uuid";


export class SaveFileBackup {

    
    constructor(){

    }



    static async  upload(path: string): Promise<{ secureUrl: string; publicId: string }> {
        const contentType = "application/";
        
        try {
          const fileBuffer = await readFile(path); 
          const keys = path.split('\\');
          const name = keys[keys.length-1];
          const key=v4();

      
          const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key+'-'+name,
            Body: fileBuffer, 
            ContentType: contentType,
          });

      
          await s3_client.send(command);
      
          const secureUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          
          console.log("Subido con exito a s3");
          return { secureUrl, publicId: key };
        } catch (error) {
          console.error("Error al subir archivo a S3:", error);
          throw new Error("No se pudo subir el archivo a S3.");
        }
    }
      


}
