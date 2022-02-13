import {ModelsArray} from "../init";


export default async function searchController(req:Express.Request,res:Express.Response){
    ModelsArray.get(req.body?.type!)!.searchByName(req.body?.searchRequest!).then((result)=>{
        res.json(result)
    })
}
