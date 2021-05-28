const Userdb = require('../model/model');

module.exports = {

    create: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Content can not be empty' });
            return;
        }

        const user = await new Userdb({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        });

        user
            .save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating a create operation" });
            });
    },

    find: async (req, res) => {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retriving user information" });
            })
    },

    update: async (req, res) => {
        if (!req.body) {
            return res.status(400)
                .send({ message: "Data to update can not be empty" });
        }

        const id = req.params.id;
        Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error Update user information" });
            })
    },

    delete: async (req, res) => {
        const id = req.params.id;

        Userdb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Delete user with ${id}. Maybe id is wrong` });
                } else {
                    res.send({ message: "User was deleted successfully" });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Could not delete user with id = " + id });
            })
    }


}