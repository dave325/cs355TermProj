const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');
let url = 'https://en.wikipedia.org/wiki/Car';
url = "https://cnn.com"
const db = require('../config/db');

module.exports.test = (req, res) => {
    rp(url)
        .then((html) => {
            //success!
            const wikiUrls = [];
            for (let i = 0; i < 45; i++) {
                wikiUrls.push($('big > a', html)[i].attribs.href);
            }
            return Promise.all(
                wikiUrls.map((url) => {
                    return newTest('https://en.wikipedia.org' + url);
                })
            );
        })
        .then((presidents) => {
            res.json(presidents).status(200);
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
}

module.exports.puppetTest = (req, res) => {
    const wikiUrls = [];
    let startTime = Date.now();
    puppeteer
        .launch()
        .then((browser) => {
            return browser.newPage();
        })
        .then((page) => {
            return page.goto(req.body.url).then(function () {
                return page.content();
            });
        })
        .then((html) => {
            return Promise.all(
                newTest(req.body.url, startTime)
            );
        })
        .then((presidents) => {
            console.log(presidents);
            res.json(presidents).status(200);
        })
        .catch(function (err) {
            //handle error
        });
}
function newTest(url, startTime) {
    return rp(url)
        .then(function (html) {
            let arr = [];
            let t = [];
            let index = [];
            let words = new Set();
            let freq = {};
            //console.log("Meta Data: " + $('title', html).text())
            let title = $('title', html).text();
            let description = $('meta[name="description"]', html).attr('content');
            let lastModified = Date.now();
            let lastIndexed = Date.now();
            let str = "INSERT INTO WORD(word) VALUES ?"
            let strPage = "INSERT INTO page(url, title, description, lastModified, lastIndexed, timeToIndex) Values(?,?,?,?,?,?)";
            let pageWordSQL = "INSERT INTO page_word(pageid, wordid, freq) VALUES ?";
            $('div, p, h1,h2,h3,h4,h5,h6, a, span, li', html).map(function () {
                let info = $(this).text().split(' ');
                info.map(function (el, idx) {
                    if (words.has(el) && el in freq) {
                        freq[el]++;
                    } else {
                        words.add(el);
                        freq[el] = 1;
                    }
                })

            }).next().text();
            index = [...words];
            index.forEach((x) => {
                let temp = [x];
                arr.push(temp)
            })
            //console.log(index)
            /* Begin transaction */
            return db.beginTransaction(function (err) {
                if (err) { throw err; }
                console.log(arr)

                return db.query(str, [arr], function (err, result) {
                    if (err) {
                        db.rollback(function () {
                            throw err;
                        });
                    }
                    let startId = result.insertId;
                    let numRows = result.affectedRows * 10;
                    let date = Date.now() - startTime;
                    return db.query(strPage, [url, title, description, Date.now(), Date.now(), date], function (err, result) {
                        if (err) {
                            db.rollback(function () {
                                throw err;
                            });
                        }
                        let pageid = result.insertId;
                        let j = 0;
                        for (let i = startId; i < (startId + numRows); i += 10) {
                            let temp = [pageid, i, freq[index[j]]];
                            t.push(temp);
                            j++;
                        }
                        return db.query(pageWordSQL, [t], function (err, result) {
                            if (err) {
                                db.rollback(function () {
                                    throw err;
                                });
                            }
                            return db.commit(function (err) {
                                if (err) {
                                    db.rollback(function () {
                                        throw err;
                                    });
                                }
                                console.log('Transaction Complete.');
                                db.end();
                                return "submiited";
                            });
                        });
                    });
                });
            });
            /* End transaction */
            //console.log("Meta Data: " + $('meta[name="description"]', html).attr('content'))
            /* $('meta[name="description"]', html).map(function () {
                console.log($(this))
            }).next().text(); */
            /*
            $('p', html).map(function () {
                let info = $(this).text().split(' ');
                info.map(function(el, idx){
                    console.log(el.trim() + " at index: " 
                    + idx);
                })
            }).next().text();*//*
            $('a', html).map(function () {
                let temp = encodeURIComponent($(this).attr('href'));
                let text = $(this).text();
                if (
                    temp.substr(0, 16) === "https%3A%2F%2Fen") {
                    arr.push($(this).attr('href'));
                    t.push($(this).text());
                    index.push($(this).text().toLowerCase().indexOf('cars'))
                }
            }).next().text();
            return {
                name: $('.firstHeading', html).text(),
                links: arr,
                text: t,
                idx: index,
                i: info
            };
            */
        })
        .catch(function (err) {
            //handle error
        });
};

module.exports.findInfo = (req, res) => {
    const wikiUrls = [];
    puppeteer
        .launch()
        .then((browser) => {
            return browser.newPage();
        })
        .then((page) => {
            return page.goto(url).then(function () {
                return page.content();
            });
        })
        .then((html) => {
            for (let i = 0; i < 10; i++) {

                if (($('a', html)[i].attribs.href != null || $('a', html)[i].attribs.href != undefined)) {
                    wikiUrls.push($('a', html)[i].attribs.href);
                }
            }
            console.log(wikiUrls);
            return Promise.all(
                wikiUrls.map((x) => {
                    return newTest(url.substr(0, url.length - 9) + x);
                })
            );
        })
        .then((presidents) => {
            res.json(presidents).status(200);
        })
        .catch(function (err) {
            //handle error
            console.log(err)
        });
}

module.exports.query = (req, res) => {
    let where;
    if (req.body.isInsensitive && req.body.isPartialMatch) {
        where = `UPPER(word.word) LIKE %UPPER('${req.body.term}')%`;
    } else if (req.body.isPartialMatch) {
        where = `word.word LIKE '%${req.body.term}%'`;
    } else if (req.body.isInsensitive) {
        where = `UPPER(word.word) = UPPER('${req.body.term}')`;
    } else {
        where = `word.word = "${req.body.term}"`;
    }
    console.log(where)
    let sql = `SELECT * 
               FROM page, word, page_word
               WHERE page.pageId = page_word.pageId
               AND word.wordId = page_word.wordId
               AND ${where}
               ORDER BY freq
                `;
    return db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json(err).status(500);
        }
        res.json(result).status(200);

    });
}