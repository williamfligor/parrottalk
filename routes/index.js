var fortune = require('fortune-teller');
/*
 * GET home page.
 */

exports.index = function(req, res){
    var fort = fortune.fortune();
    var s = fort.replace(/[^-a-z0-9 ]/ig,'');
    fort = fort.replace(/ /g, "&emsp;");
    fort = fort.replace(/\n/g, "<br />");
    res.render('./index', {message : fort, msg : s});
};
