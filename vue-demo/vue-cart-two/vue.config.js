module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function (req, res) {
                    res.json({
                        code: 0,
                        data: [{
                            id: 1,
                            name: 'one',
                            price: 1000
                        }, {
                            id: 2,
                            name: 'two',
                            price: 2000
                        }]
                    })
                })
            }
        }
    }
}