import {PrismaClient} from '@prisma/client';
import firstLetterToUpperCase from "../Helpers/FirstLetterToUpperCase";

export default class Address extends PrismaClient{

    public async addNew(obj:Express.Request){
        const responseBody:any[]=[];
        return this.address.create({
            data:{
                name:firstLetterToUpperCase(obj.body?.name!)
            }
        }).then((result)=>{
            responseBody.push('success')
            responseBody.push(result)
            return responseBody
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
    }

    public async changeRecordById(obj:Express.Request){
        return 0;
    }

    public async deleteById(id:number){
        const responseBody:any[]=[]
        return this.address.delete({
            where:{
                id:id
            }
        }).then((result)=>{
            responseBody.push('success')
            responseBody.push(result)
            return responseBody
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
    }

    public async deleteManyById(field:"book"|"genre",id:number) {
        return 0;
    }

    public async findManyById(id:number){
        return await this.address.findMany({
            where:{
                id:id
            }
        })
    }

    public async get20(searchRequest:string,page:number){
        const responseBody:any[]=[];
        return this.address.findMany({
            skip:(page-1)*20,
            take:20
        }).then((result)=>{
            responseBody.push('success')
            responseBody.push(result)
            return responseBody
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
    }

    public async getBookBy(field:string,value:number|string,page:number){
        return 0;
    }

    public async searchByName(searchRequest:string) {
        const responseBody: any[] = [];
        return this.address.findMany(
            {
                where: {
                    name: {
                        startsWith: searchRequest
                    }
                },
                select: {
                    name: true,
                    id: true
                },
                take: 15
            }
        ).then((result) => {
            responseBody.push('success')
            responseBody.push(result)
            return responseBody
        }).catch((e) => {
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
    }
}