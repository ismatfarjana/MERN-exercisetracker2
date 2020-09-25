const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
    Exercise.find() //mongoose call back function, it will find all exercise
        .then(exercises => res.json(exercises)) //read the json file
        .catch(err => res.status(400).json("Error:" + err)); //if anything wrong , throw error
});

//route to add new exercise
router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const age = Number(req.body.age);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        age,
        date
    });

    newExercise
        .save()
        .then(() => res.json("New exercise added to the log!"))
        .catch(err => res.status(400).json("error:" + err));
});

//route to get specific exercise
router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json("Error:" + err));
});

//route to delete one specific exercise
router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted!"))
        .catch(err => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise
                .save()
                .then(() => res.json("Welldone, Exercise updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
