import cors from 'cors'
import { ENV } from './src/config/env.js'
import http from "http"
import app from './src/app.js'
import { initSocket } from './src/config/socket.js'
import connectDB from './src/config/mongodb.js'
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const server = http.createServer(app)


app.use(cors())
initSocket(server)

//app.use('/api/v1/backend', userRoute)

app.get('/',(req,res) => {
    res.send("API is running...")
})

app.listen(ENV.PORT, () =>{
    connectDB(),
    console.log(`Server is running on port ${ENV.PORT}`);
})

