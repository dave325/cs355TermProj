
const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

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
    puppeteer
        .launch()
        .then( (browser) =>{
            return browser.newPage();
        })
        .then( (page) =>{
            return page.goto(url).then(function () {
                return page.content();
            });
        })
        .then( (html) =>{
            for (let i = 0; i < 45; i++) {
                wikiUrls.push($('big > a', html)[i].attribs.href);
            }
            console.log(wikiUrls)
            return Promise.all(
                wikiUrls.map((x) => {
                    return newTest('https://en.wikipedia.org' + x);
                })
            );
        })
        .then((presidents) => {
            res.json(presidents).status(200);
        })
        .catch(function (err) {
            //handle error
        });
}
function newTest(url) {
    return rp(url)
        .then(function (html) {
            return {
                name: $('.firstHeading', html).text(),
                birthday: $('.bday', html).text(),
            };
        })
        .catch(function (err) {
            //handle error
        });
};
