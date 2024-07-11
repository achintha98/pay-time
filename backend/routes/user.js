const {Router} = require("express");
const { userMiddleWare } = require("../middleware/user");
const router = Router();
const app = express();

router.post("signup", userMiddleWare, () => {

})

module.exports = {
    router
}