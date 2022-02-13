import {ModelsArray} from "../init";


export default async function get20Controller(req:Express.Request, res:Express.Response){
    ModelsArray.get(req.body?.type!)!.get20(req.body?.searchRequest!,Number(req.body?.page!)).then((result)=>{
        res.json(result)
    })
}