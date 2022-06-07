/* const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path') */
import express from "express";
import {__dirname} from "../app.js"
import session from "express-session"
import MongoStore from "connect-mongo"

const router = express.Router()

router.use(session({
    saveUninitialized:false,
    resave:false,
    secret:"12345",
    store: MongoStore.create({
        mongoUrl:process.env.CONNECT_MONGO_URL,
        ttl:10
    }),
    cookie: { 
        maxAge : 10000
    }
}))

router.get('/', (req, res) => {
    const user = req.session.user
    if(user) return res.sendFile('/public/html/logged.html', { root: __dirname })
    res.redirect('/login')
    
})

export default router