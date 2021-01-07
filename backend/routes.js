import express from 'express'
import asyncHandler from 'express-async-handler'
import axios from 'axios'
import dotenv from 'dotenv'
const router = express.Router()

dotenv.config()

//Base URL
const base_url = 'https://trefle.io/api/v1/plants/'
const apiKey = process.env.TREFLE_API_KEY

//Fetch Plants
const plantsURL = () => `${base_url}`

//Plant Details
const plantDetailURL = scientificName => `${base_url}${scientificName}`

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const plantsData = await axios.get(plantsURL(), {
      params: {
        token: apiKey,
      },
    })

    if (plantsData) {
      res.json(plantsData.data)
    } else {
      res.status(404)
    }
  })
)

router.get(
  '/page/:number',
  asyncHandler(async (req, res) => {
    const plantsData = await axios.get(plantsURL(), {
      params: {
        token: apiKey,
        page: req.params.number,
      },
    })

    if (plantsData) {
      res.json(plantsData.data)
    } else {
      res.status(404)
    }
  })
)

router.get(
  '/:plant',
  asyncHandler(async (req, res) => {
    const detailData = await axios
      .get(plantDetailURL(req.params.plant), {
        params: {
          token: apiKey,
        },
      })
      .catch(() => {
        //Handled in PlantDetail.js
        res.send('')
      })

    if (detailData) {
      res.json(detailData.data)
    }
  })
)

export default router
