import React from "react"
import { render } from "react-dom"
import "./assets/scss/main.scss"
import FAQList from "./components/FAQList"
import config from "./config"
import RedBox from "redbox-react"
import App from "./components/App.js"

document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app")

  if (reactElement) {
    if (config.env === "development") {
      try {
        render(<App />, reactElement)
      } catch (e) {
        render(<App error={e} />, reactElement)
      }
    } else {
      render(<App />, reactElement)
    }
  }
})
