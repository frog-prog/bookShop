import {PrismaClient} from '@prisma/client';
import firstLetterToUpperCase from "../Helpers/FirstLetterToUpperCase";

export default class Order extends PrismaClient {

    public async add(obj: Express.Request) {
        const responseBody: any[] = []
        let orderCount = await this.order.count({
            where: {
                bookId: Number(obj.body?.id),
                status:'booked'
            }
        })
        let book = await this.book.findFirst({
            where: {
                id: Number(obj.body?.id)
            }
        })
        if (book!.amount === orderCount) {
            responseBody.push('fail')
            responseBody.push('Все книги зарезервированы')
            return responseBody
        }
        else{
            return this.order.create({
                data: {
                    bookId: Number(obj.body?.id!),
                    customer: firstLetterToUpperCase(obj.body?.name!),
                    status: 'booked'
                }
            }).then((result) => {
                responseBody.push('success')
                responseBody.push(result)
                return responseBody
            }).catch((e)=>{
                responseBody.push('fail')
                responseBody.push(e)
                return responseBody
            })
        }
    }

    public async complete(obj: Express.Request) {
        const responseBody: any[] = []
        let test=await this.order.count({
            where: {
                id: Number(obj.body?.id),
                status:'booked'
            },
        }).catch((e)=>{
            responseBody.push('fail');
            responseBody.push(e)
            return responseBody
        })
        if(test===0){
            responseBody.push('fail');
            responseBody.push('Заказ не найден')
            return responseBody
        }
        return this.order.update({
            where: {
                id: Number(obj.body?.id)
            },
            data: {
                status: 'completed'
            }
        }).then(async (result) => {
            return this.book.findFirst({
                where:{
                    id:result.bookId
                }
            }).then(async (result)=>{
                if(result!.amount===1){
                    return this.book.delete({
                        where:{
                          id:result!.id
                        }
                    }).then(()=>{
                        responseBody.push('success')
                        return responseBody
                    }).catch((e) => {
                        responseBody.push('fail')
                        responseBody.push(e)
                        return responseBody
                    })
                }
                else{
                    return this.book.update({
                        where:{
                            id:result!.id
                        },
                        data:{
                            amount:(result!.amount-1)
                        }
                    }).then(()=>{
                        responseBody.push('success')
                        return responseBody
                    }).catch((e) => {
                        responseBody.push('fail')
                        responseBody.push(e)
                        return responseBody
                    })
                }
            }).catch((e) => {
                responseBody.push('fail')
                responseBody.push(e)
                return responseBody
            })
        }).catch((e) => {
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
    }

    public async reject(obj:Express.Request) {
        const responseBody: any[] = []
        return this.order.delete({
            where: {
                id: Number(obj.body?.id)
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

    public async searchByBooker(obj:Express.Request){
        const responseBody:any[]=[]
        let pageCount = await this.order.count({where:{customer:{startsWith: firstLetterToUpperCase(obj.body?.name!)}}})
        pageCount=Math.ceil(pageCount/20)
        return this.order.findMany({
            where:{
                customer:{
                  startsWith: firstLetterToUpperCase(obj.body?.name!)
                }
            },
            include:{
                book:true
            },
            skip:(obj.body?.page!-1)*20,
            take:20
        }).then((result)=>{
            responseBody.push('success')
            responseBody.push(pageCount)
            responseBody.push(result)
            return responseBody
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
        })
    }
}