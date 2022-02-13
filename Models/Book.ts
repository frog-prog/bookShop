import {PrismaClient} from '@prisma/client';
import firstLetterToUpperCase from "../Helpers/FirstLetterToUpperCase";

export default class Book extends PrismaClient{

    public async findById(id:number){
        const responseBody:any[]=[];
        return this.book.findMany({
            where:{
                id:id
            },
            include:{
                author:true,
                address:true,
                pubHouse:true,
                genres:{include: {genre: true}}
            }
        }).then((result)=>{
            responseBody.push('success')
            responseBody.push(result)
            return responseBody
        })
    }

    public async deleteById(id:number) {
        const responseBody:any[]=[];
        let orderCount= await this.order.count({
            where:{
                bookId:id,
                status:'booked'
            }
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
        let bookCount=await this.book.findMany({
            where:{
                id:id
            }
        }).catch((e)=>{
            responseBody.push('fail')
            responseBody.push(e)
            return responseBody
        })
        if(bookCount.length===0){
            responseBody.push('fail')
            responseBody.push('Книга не найдена')
            return responseBody
        }
        if(bookCount[0].amount>orderCount){
            if(bookCount[0].amount===1){
                return this.genresOnBooks.deleteMany({
                    where:{
                        bookId: id
                    }
                }).then(async (result)=>{
                    return this.order.deleteMany({
                        where:{
                            bookId:id
                        }
                    }).then(async (result)=>{
                        return this.book.delete({
                            where:{
                                id:id
                            }
                        }).then((result)=>{
                            responseBody.push('success')
                            responseBody.push(result)
                            responseBody.push('deleted')
                            return responseBody
                        }).catch((e)=>{
                            responseBody.push('fail')
                            responseBody.push(e)
                            return responseBody
                        })
                    }).catch((e)=>{
                        responseBody.push('fail')
                        responseBody.push(e)
                        return responseBody
                    })
                })
            }
            else{
                return this.book.update({
                    where:{
                        id:id
                    },
                    data:{
                        amount:(bookCount[0].amount-1)
                    }
                }).then((result)=>{
                    responseBody.push('success')
                    responseBody.push(result)
                    responseBody.push('updated')
                    return responseBody
                }).catch((e)=>{
                    responseBody.push('fail')
                    responseBody.push(e)
                    return responseBody
                })
            }
        }
        else{
            responseBody.push('fail')
            responseBody.push('Книга зарезервирована')
            return responseBody
        }
    }

    public async searchByName(searchRequest:string){
        const responseBody:any[]=[];
        return this.book.findMany(
            {
                where:{
                    name:{
                        startsWith: searchRequest
                    }
                },
                select:{
                    name:true,
                    id:true
                },
                take:15
            }
        ).then((result)=>{
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
        const responseBody:any[]=[];
        let obj1:any=0
        let obj2:any=0
        let pageCount=1
        switch(field){
            case "id":
                obj1={where:{id:Number(value)},include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                break;
            case "genre":
                obj1={where:{genres:{some: {genre: {id:Number(value)},},},}, take:20, skip:(page-1)*20, include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                obj2={where:{genres:{some: {genre: {id:Number(value)},},},}}
                break;
            case "author":
                obj1={where:{authorId:Number(value)}, take:20, skip:(page-1)*20, include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                obj2={where:{authorId:Number(value)}}
                break;
            case "address":
                obj1={where:{addressId: Number(value),}, take:20, skip:(page-1)*20, include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                obj2={where:{addressId: Number(value),}}
                break;
            case "pubHouse":
                obj1={where:{pubHouseId:Number(value)}, take:20, skip:(page!-1)*20, include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                obj2={where:{pubHouseId:Number(value)}}
                break;
            case 'name':
                console.log(value,typeof value)
                if(typeof value==='string'){
                    console.log(value,value.trim())
                    obj1={where:{name:{contains: value.trim(), mode:'insensitive'}}, skip:(page-1)*20, take:20, include:{author:true, address:true, pubHouse:true, genres:{include: {genre: true}}}}
                    obj2={where:{name:{contains: value.trim(), mode:'insensitive'}}}
                }
        }
        if(field!=='id'){
            pageCount= await this.book.count(obj2)
            pageCount=Math.ceil(pageCount/20)
        }
        if(obj1!==0){
            return this.book.findMany(obj1).then((result)=>{
                for(let i=0; i<result.length;i++){
                    result[i].endAt=result[i].endAt-Math.floor(Date.now()/1000/3600/24)
                }
                responseBody.push('success')
                responseBody.push(pageCount)
                responseBody.push(result)
                return responseBody
            }).catch((e)=>{
                responseBody.push('fail')
                responseBody.push(e)
                return responseBody
            })
        }
        else{
            responseBody.push('fail')
            responseBody.push('запрос не определен')
            return responseBody
        }
    }

    public async get20(searchRequest:string,page:number){
        const responseBody:any[]=[];
        return this.book.findMany({
            where:{
              name:{
                  contains: searchRequest.trim(),
                  mode:'insensitive'
              }
            },
            skip:(page-1)*20,
            take:20,
            include:{
                author:true,
                address:true,
                pubHouse:true,
                genres:{include: {genre: true}}
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

    public async addNew(obj:Express.Request){
        const responseBody:any[]=[];
        return this.book.create({
            data:{
                endAt: obj.body?.endAt!,
                name: firstLetterToUpperCase(obj.body?.name!)!,
                genres: {
                    create: obj.body?.genres.map(genre=>({
                        genre: {
                            connect: {
                                id: genre
                            }
                        }
                    }))
                },
                amount: obj.body?.amount!,
                price:obj.body?.price!,
                authorId: obj.body?.authorId!,
                addressId: obj.body?.addressId!,
                pubHouseId: obj.body?.pubHouse!,
                pubYear:obj.body?.pubYear!
            },
            include:{
                author:true,
                address:true,
                pubHouse:true,
                genres:{include: {genre: true}}
            }
        }).then((result)=>{
                result.endAt=result.endAt-Math.floor(Date.now()/1000/3600/24)
                responseBody.push('success');
                responseBody.push(result)
                return responseBody
            }).catch((e)=>{
            responseBody.push('fail');
            responseBody.push(e)
            return responseBody
        })
    }


    public async changeRecordById(obj:Express.Request) {
        const responseBody:any[]=[];
        return this.genresOnBooks.deleteMany({
            where:{
                bookId: obj.body?.id
            }
        }).then(async ()=>{
            return this.book.update({
                where:{
                    id:obj.body?.id
                },
                data:{
                    endAt: obj.body?.endAt!,
                    name: firstLetterToUpperCase(obj.body?.name!),
                    genres: {
                        create: obj.body?.genres.map(genre=>({
                            genre: {
                                connect: {
                                    id: genre
                                }
                            }
                        }))
                    },
                    amount: obj.body?.amount!,
                    price:obj.body?.price!,
                    authorId: obj.body?.authorId!,
                    addressId: obj.body?.addressId!,
                    pubHouseId: obj.body?.pubHouse!,
                    pubYear:obj.body?.pubYear!
                }
            }).then((result)=>{
                result.endAt=result.endAt-Math.floor(Date.now()/1000/3600/24)
                responseBody.push('success')
                responseBody.push(result)
                return responseBody
            }).catch((e)=>{
                responseBody.push('fail')
                responseBody.push(e)
                return responseBody
            })
        })
    }


    public async deleteManyById(field:"book"|"genre",id:number) {
        return 0;
    }
}