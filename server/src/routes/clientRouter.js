import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

//put the paths you want react router to use in the []. It allows react to take over. Creating a better user exp. by
// not having to  create multiple http requests every time a user navigate through our app.

const clientRoutes = ["/","/launchers","/launchers/:id"]
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
