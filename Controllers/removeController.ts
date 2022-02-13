import {ModelsArray} from "../init";

export default async function removeController(req: Express.Request, res: Express.Response) {
    ModelsArray.get(req.params?.type!)!.deleteById(Number(req.params?.id!)).then((result)=>{
        res.json(result)
    })
}
