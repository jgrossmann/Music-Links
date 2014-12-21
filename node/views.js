var userdb = require ('./userdb.js');
var database = require('./database.js');
var geoip = require('geoip-lite');
var ip = request.connection.remoteAddress;
var geo = geoip.lookup(ip);

exports.index = function (req, res) {
    console.log(geo);
    var username = userdb.get_user_name(req.session.id);
    var songinfo = database.get_song_info();
    res.render('index', {title: "Twitter Music Recommender", message: "Hello, world", user:username, songinfo:songinfo});
};

exports.tests = function (req, res) {
    var username = userdb.get_user_name(req.session.id); 
    var throughput = userdb.get_throughput_average(req.session.id);
    var rtt = userdb.get_RTT_average(req.session.id);
    res.render('tests', {title: "Speed tests", message: "Hello, world", user:username, RTT:rtt, Throughput:throughput});
};

exports.test_results = function (req, res) {
    var rtt = userdb.get_RTT_average(req.session.id);
    var throughput = userdb.get_throughput_average(req.session.id);
    res.render('test_results', {RTT:rtt, Throughput:throughput});
};

exports.recommendations = function(req, res) {
    var recommendations = database.get_recommendations();
    res.render('recommendations', {recommendations:recommendations});
};

exports.reset_addin = function(req, res) {
    res.render('addin', {});
};
