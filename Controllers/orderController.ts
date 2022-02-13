import Order from "../Models/Order";

const orderController=async (req:Express.Request,res:Express.Response)=>{
    const a=new Order()
    switch(req.body?.type){
        case 'add':
            a.add(req).then((result)=>{
                res.json(result)
            })
            break;
        case 'complete':
            a.complete(req).then((result)=>{
                res.json(result)
            })
            break;
        case 'reject':
            a.reject(req).then((result)=>{
                res.json(result)
            })
            break;
        case 'search':
            a.searchByBooker(req).then((result)=>{
                res.json(result)
            })
            break;
    }
}
export default orderController