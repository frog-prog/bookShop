import {ModelsArray} from "../init";


export default async function getBookByController(req: Express.Request, res: Express.Response) {

    if (req.body?.type === 'id' || req.body?.type !== 'name') {
        if ('type' in req.body! && 'id' in req.body! && 'page' in req.body!) {
            if(typeof req.body.type==="string" && typeof req.body.id==="number" && typeof req.body.page==="number"){
                ModelsArray.get('book')!.getBookBy(req.body?.type!, Number(req.body?.id!), Number(req.body?.page!)).then((result) => {
                    res.json(result)
                })
            }else {
                res.json(['fail', 'Запрос неверен'])
            }
        } else {
            res.json(['fail', 'Запрос неверен'])
        }
    } else {
        if ('type' in req.body! && 'name' in req.body! && 'page' in req.body!) {
            if(typeof req.body.type==="string" && typeof req.body.name==="string" && typeof req.body.page==="number") {
                ModelsArray.get('book')!.getBookBy(req.body?.type!, req.body?.name!, Number(req.body?.page!)).then((result) => {
                    res.json(result)
                })
            }else {
                res.json(['fail', 'Запрос неверен'])
            }
        } else {
            res.json(['fail', 'Запрос неверен'])
        }
    }

}