const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',  checkNotLogin, (req, res, next) => {
  // res.send('注册页');
  res.render('signup');
});

router.post('/', checkNotLogin, (req, res, next) => {
  const name = req.fields.name;
  const gender = req.fields.gender;
  const bio = req.fields.bio;
  // console.log('avatar');
  // console.log(req);
  // console.log(req.fields);
  // console.log(req.files);
  // console.log(path.sep);
  const avatar = req.files.avatar.path.split(path.sep).pop();
  // console.log(avatar);
  let password = req.fields.password;
  const repassword = req.fields.repassword;

  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字限制在1 - 10 个字符之内');
    }

    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x');
    }

    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符');
    }

    if (!req.files.avatar.name) {
      throw new Error('缺少头像');
    }

    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }

    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }

  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path);
    req.flash('error', e.message);
    return res.redirect('signup');
  }

  password = sha1(password);

  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };

  UserModel.create(user).then(function (result) {
    // 此 user 是插入 mongodb 后的值，包含 _id
    user = result.ops[0];
    // 删除密码这种敏感信息，将用户信息存入 session
    delete user.password;
    req.session.user = user;
    // 写入 flash
    req.flash('success', '注册成功');
    // 跳转到首页
    res.redirect('/posts');
  }).catch(function (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path);
    if (e.message.match('duplicate key')) {
        req.flash('error', '用户名已经被占用');
        res.redirect('/signup');
    }
    next(e);
  });

});

module.exports = router;
