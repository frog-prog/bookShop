import {app} from "./init";
import {
    addRoute,
    getBookByRoute,
    removeRoute,
    searchRoute,
    get10Route,
    updateRoute,
    orderRoute
} from "./Routes/api/apiRoutes";
const cors=require('cors');
const bp = require('body-parser');
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

addRoute();

removeRoute();

searchRoute();

get10Route();

getBookByRoute();

updateRoute();

orderRoute();

app.listen(2000, () => console.log("Server ready at: http://localhost:2000"))