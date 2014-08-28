var fortune = require('fortune-teller'),
    cowsay = require('cowsay');
/*
 * GET home page.
 */

function getCow(){
    var fort = fortune.fortune();
    fort = cowsay.say({
        'face' : 'parrot',
        'text' : fort,
        'e': 'oO',
        'T': 'U'
    });

    var s = fort.replace(/[^-a-z0-9 ]/ig,'');
    fort = fort.replace(/ /g, "&emsp;");
    fort = fort.replace(/\n/g, "<br />");

    return {
        'cowText': fort,
        'textOnly': s
    };
}

exports.cow = function(req, res){
    res.send(getCow());
};

exports.index = function(req, res){
    res.render('./index');
};

