import {ModelsArray} from "../init";

export default async function updateController(req:Express.Request,res:Express.Response){
    ModelsArray.get(req.body?.type!)!.changeRecordById(req).then((result)=>{
            res.json(result)
    })
}