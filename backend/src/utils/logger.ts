import pino from "pino"
import dayjs from "dayjs"

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

export default logger;