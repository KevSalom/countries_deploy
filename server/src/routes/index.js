const { Router } = require("express");
const getCountries = require('../controllers/getCountries')
const getCountryByName = require('../controllers/getCountryByName')
const getCountryById = require('../controllers/getCountryById')
const getActivities = require('../controllers/getActivities')
const deleteActivity = require('../controllers/deleteActivity')
const countriesSort = require('../controllers/countriesSort')
const getSortActivities = require('../controllers/getSortActivities')
const getActivitiesByName = require('../controllers/getActivitiesByName')
const {validateBodyParams, postActivity} = require('../controllers/postActivity')
const router = Router();

router.get('/countries', (req, res) => {
    if(Object.keys(req.query).length === 0){
        getCountries(req, res)
    } else {
        getCountryByName(req, res)
    }
})

router.get('/activities', (req, res) => {
    if(Object.keys(req.query).length === 0){
        getActivities(req, res)
    } else {
        getSortActivities(req, res)
    }
})

router.get('/activityname', getActivitiesByName)
router.get('/countries/sort', countriesSort)
router.get('/countries/:idPais', getCountryById)
router.post('/activities', validateBodyParams, postActivity)
router.delete('/activities', deleteActivity)


module.exports = router;
