import { createRef } from "react"

const state = {
  sections: 3,
  pages: 3,
  zoom: 75,
  images: ["/1.jpg", "/2.jpg", "/3.jpg"],
  top: createRef()
}

export default state
