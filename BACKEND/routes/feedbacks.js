const router = require("express").Router();
let Feedback = require("../models/Feedback");

                            // feedback Add /add

router.route("/add").post((req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    const newFeedback = new Feedback({
        email,
        name,
        message
    })

    newFeedback.save().then(()=>{
        res.json("Feedback Added")
    }).catch((err)=>{
        console.log(err);
    })
})

                            // feedback read /

router.route("/").get((req,res)=>{

    Feedback.find().then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
            console.log(err)
    })
})

                            // feedback update /update/id

router.route("/update/:id").put(async (req,res)=> {
    let userId = req.params.id;
    const {email,name,message} = req.body;

    const updateFeedback = {
        email,
        name,
        message
    }

    const update = await Feedback.findByIdAndUpdate(userId, updateFeedback)
    .then(()=>{
        res.status(200).send({status: "Feedback updated,"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})

                                // feedback delete /delete/id

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Feedback.findByIdAndDelete(userId)
        .then(()=>{
            res.status(200).send({status: "Feedback deleted"});
        }).catch((errr)=>{
            console.log(err.message);
            res.status(500).send({status: "Error with delete feedback", error: err.message});
        })
})

module.exports = router;