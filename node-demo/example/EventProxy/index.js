// eventproxy 控制并发
const eventProxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const express = require('express');

const url = require('url');
const app = express();
const ep = eventProxy();

const cNodeUrl = 'https://cnodejs.org/';


app.get('/', function (req, res, next) {
    superagent.get(cNodeUrl).end(function (err, data) {
        if (err) { return next(err) }

        const topicUrls = [];
        const $ = cheerio.load(data.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            const $element = $(element);
            const href = url.resolve(cNodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        ep.after('topic_content_html', topicUrls.length, function (topics) {

            topics = topics.map(function (topic) {
                const topicUrl = topic[0];
                const topicHtml = topic[1];
                const $ = cheerio.load(topicHtml);
                return {
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment: $('.markdown-text').eq(0).text().trim()
                }
            });

            res.send(topics);
        });


        topicUrls.forEach(function (tempUrl) {
            superagent.get(tempUrl).end(function (err, data) {
                ep.emit('topic_content_html', [tempUrl, data.text])
            })
        })
    });
});


app.listen(8100, function () {
    console.log('http://localhost:8100')
});