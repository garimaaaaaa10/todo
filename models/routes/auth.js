const router = require("express").Router();
const User = require("../user");
const bcrypt = require("bcryptjs");


router.post("/register", async (req, res) => {
    try {

        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        await user.save().then(() => 
            res.status(200)
                .json({ message:"SignUp Successfull" })
        );

    } catch (error) {
        console.log("Register error:", error.message);
         res.status(500)
                .json({ message:"Internal Server Error" });


    };
});


router.post("/signin", async (req, res) => {
    try {
        console.log("Request:" , req.body);
        console.log("Email:" , req.body.email);
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(200).json({ message :"Please Sign Up First"});
    
        }
    
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password, 
            user.password);
            
        if(!isPasswordCorrect){
            return res.status(200).json({ message :"Password is Not Correct"});
    
        }
        const { password, ...others} = user._doc;
        res.status(200)
                .json({ others});

    

    } catch (error) {
        console.log("Signin error:", error.message);
         res.status(500)
                .json({ message:"Internal Server Error" });


    };
});

module.exports = router;

