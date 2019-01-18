// 简单爬虫
const superagent = require('superagent');
const cheerio = require('cheerio');

const express = require('express');

const app = express();

app.get('/', function (req, res, next) {
    // 用superagent抓取网页
    superagent.get('http://cnodejs.org').end(function (err, data) {
        if(err) return next(err);
        // data.text 存网页html 使用cheerio.load后 就可以用jquery;
        const $ = cheerio.load(data.text);
        const items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            const $element = $(element)
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });

        res.send(items);
    })
});

app.listen(8000, function () {
    console.log('http://localhost:8000')
})