import {app} from '../../init'
import addController from "../../Controllers/addController";
import getBookByController from "../../Controllers/getBookByController";
import get20Controller from "../../Controllers/get20Controller";
import searchController from "../../Controllers/searchController";
import removeController from "../../Controllers/removeController";
import updateController from "../../Controllers/updateController";
import orderController from "../../Controllers/orderController";

export const addRoute=()=>{
    return app.post('/add',
        (req,res)=>addController(req,res)
    )
}
export const searchRoute=()=>{
    return app.post('/search',
        (req,res)=>searchController(req,res)
    )
}
export const get10Route=()=>{
    return app.post('/get',
        (req,res)=>get20Controller(req,res)
    )
}
export const getBookByRoute=()=>{
    return app.post('/getBy',
        (req,res)=>getBookByController(req,res)
    )
}
export const removeRoute=()=>{
    return app.get('/remove/:type/:id',
        (req,res)=>removeController(req,res)
    )
}
export const updateRoute=()=>{
    return app.post('/update',
        (req,res)=>updateController(req,res)
    )
}
export const orderRoute=()=>{
    return app.post('/order',
        (req,res)=>orderController(req,res)
    )
}