var Costume = require('../models/costume');

// List of all costumes
exports.costume_list = async function(req, res) {
    try {
        let theCostumes = await Costume.find();
        res.send(theCostumes);
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// Detail of one costume
exports.costume_detail = async function(req, res) {
    try {
        let result = await Costume.findById(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send({ "error": `document for id ${req.params.id} not found` });
    }
};

// Create costume
exports.costume_create_post = async function(req, res) {
    let document = new Costume();
    document.costume_type = req.body.costume_type;
    document.size = req.body.size;
    document.cost = req.body.cost;

    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// Update costume
exports.costume_update_put = async function(req, res) {
    try {
        let toUpdate = await Costume.findById(req.params.id);

        if (req.body.costume_type)
            toUpdate.costume_type = req.body.costume_type;
        if (req.body.size)
            toUpdate.size = req.body.size;
        if (req.body.cost)
            toUpdate.cost = req.body.cost;

        let result = await toUpdate.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}: Update for id ${req.params.id} failed` });
    }
};

// ✅ DELETE costume (IMPORTANT PART)
exports.costume_delete = async function(req, res) {
    try {
        let result = await Costume.findByIdAndDelete(req.params.id);

        // REQUIRED for assignment: return {} if not found
        if (!result) {
            return res.send({});
        }

        res.send(result);
    } catch (err) {
        res.status(500);
        res.send({ "error": `Error deleting ${err}` });
    }
};

// View all costumes
exports.costume_view_all_Page = async function(req, res) {
    try {
        let theCostumes = await Costume.find();
        res.render('costumes', { 
            title: 'Costume Search Results', 
            results: theCostumes 
        });
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// View one costume
exports.costume_view_one_Page = async function(req, res) {
    try {
        let result = await Costume.findById(req.query.id);
        res.render('costumedetail', { 
            title: 'Costume Detail', 
            toShow: result 
        });
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// Create page
exports.costume_create_Page = async function(req, res) {
    try {
        res.render('costumecreate', { title: 'Costume Create' });
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// Update page
exports.costume_update_Page = async function(req, res) {
    try {
        let result = await Costume.findById(req.query.id);
        res.render('costumeupdate', { 
            title: 'Costume Update', 
            toShow: result 
        });
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};

// Delete page (for UI)
exports.costume_delete_Page = async function(req, res) {
    try {
        let result = await Costume.findById(req.query.id);
        res.render('costumedelete', { 
            title: 'Costume Delete', 
            toShow: result 
        });
    } catch (err) {
        res.status(500);
        res.send({ "error": `${err}` });
    }
};