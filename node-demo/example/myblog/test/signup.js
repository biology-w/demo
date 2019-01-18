const path = require('path')
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const User = require('../lib/mongo').User

const testNameOne = 'tNameOne'
const testNameTwo = 'tNameTwo'
describe('signup', function () {
  const agent = request.agent(app)
  beforeEach(function (done) {
    User.create({
      name: testNameOne,
      password: '111111',
      avatar: '',
      gender: 'x',
      bio: ''
    }).exec().then(function () {
      done()
    }).catch(done)
  })

  afterEach(function (done) {
    User.deleteMany({ name: { $in: [testNameOne, testNameTwo] } })
      .exec().then(function () {
        done()
      }).catch(done)
  })

  after(function (done) {
    process.exit()
  })

  it('wrong name', function (done) {
    agent.post('/signup').type('form').field({ name: '' })
      .attach('avatar', path.join(__dirname, 'avatar.png'))
      .redirects().end(function (err, res) {
        if (err) return done(err)
        assert(res.text.match(/名字请限制在 1-10 个字符/))
        done()
      })
  })

  it('wrong gender', function (done) {
    agent.post('/signup').type('form').field({ name: testNameTwo, gender: 'a' })
      .attach('avatar', path.join(__dirname, 'avatar.png'))
      .redirects().end(function (err, res) {
        if (err) return done(err)
        assert(res.text.match(/性别只能是 m、f 或 x/))
        done()
      })
  })

  it('duplicate name', function (done) {
    agent.post('/signup').type('form')
      .field({ name: testNameOne, gender: 'm', bio: 'test', password: '12345', repassword: '123456' })
      .attach('avatar', path(__dirname, 'avatar.png'))
      .redirects().end(function (err, res) {
        if (err) return done(err)
        assert(res.text.match(/用户名已被占用/))
        done()
      })
  })

  it('success', function (done) {
    agent.post('/signup').type('form')
      .field({ name: testNameTwo, gender: 'm', bio: 'test', password: '123456', repassword: '123456' })
      .attach('avatar', path.join(__dirname, 'avatar.png'))
      .redirects().end(function (err, res) {
        if (err) return done(err)
        assert(res.text.match(/注册成功/))
        done()
      })
  })
})
