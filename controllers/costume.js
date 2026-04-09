const Costume = require('../models/costume');

// List all costumes
exports.costume_list = async function(req, res) {
  try {
    const theCostumes = await Costume.find();
    res.send(theCostumes);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// View all costumes page
exports.costume_view_all_Page = async function(req, res) {
  try {
    const theCostumes = await Costume.find();
    res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}` });
  }
};

// For one costume
exports.costume_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

exports.costume_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume create POST');
};

exports.costume_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

exports.costume_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
};