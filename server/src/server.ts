import express from "express"
import cors from "cors"
import { routes } from "./routes";

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3333
app.use(routes)

app.listen(PORT, ()=> console.log("HTTP server running!"))