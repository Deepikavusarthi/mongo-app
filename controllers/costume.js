const Costume = require('../models/costume');

// List all costumes
exports.costume_list = async function (req, res) {
  try {
    const theCostumes = await Costume.find();
    res.send(theCostumes);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// View all costumes page
exports.costume_view_all_Page = async function (req, res) {
  try {
    const theCostumes = await Costume.find();
    res.render('costumes', {
      title: 'Costume Search Results',
      results: theCostumes
    });
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// For one costume
exports.costume_detail = async function (req, res) {
  console.log("detail " + req.params.id);
  try {
    const result = await Costume.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({ error: `Document for id ${req.params.id} not found` });
  }
};

// Handle costume create on POST
exports.costume_create_post = async function (req, res) {
  console.log(req.body);
  let document = new Costume();
  document.costume_type = req.body.costume_type;
  document.cost = req.body.cost;
  document.size = req.body.size;

  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// Handle costume delete on DELETE
exports.costume_delete = async function (req, res) {
  console.log("delete " + req.params.id);

  try {
    const result = await Costume.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// Handle costume update on PUT
exports.costume_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
    let toUpdate = await Costume.findById(req.params.id);

    if (req.body.costume_type) {
      toUpdate.costume_type = req.body.costume_type;
    }
    if (req.body.cost) {
      toUpdate.cost = req.body.cost;
    }
    if (req.body.size) {
      toUpdate.size = req.body.size;
    }

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}: Update for id ${req.params.id} failed` });
  }
};