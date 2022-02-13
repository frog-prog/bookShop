import {ModelsArray} from "../init";

export default async function addController(req:Express.Request,res:Express.Response){
    ModelsArray.get(req.body?.type!)!.addNew(req)
        .then((result)=>{
            res.json(result)
        })
}