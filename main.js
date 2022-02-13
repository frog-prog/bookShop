"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const apiRoutes_1 = require("./Routes/api/apiRoutes");
const cors = require('cors');
const bp = require('body-parser');
init_1.app.use(cors());
init_1.app.use(bp.json());
init_1.app.use(bp.urlencoded({ extended: true }));
(0, apiRoutes_1.addRoute)();
(0, apiRoutes_1.removeRoute)();
(0, apiRoutes_1.searchRoute)();
(0, apiRoutes_1.get10Route)();
(0, apiRoutes_1.getBookByRoute)();
(0, apiRoutes_1.updateRoute)();
(0, apiRoutes_1.orderRoute)();
init_1.app.listen(2000, () => console.log("Server ready at: http://localhost:2000"));
