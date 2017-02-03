// Nothing to change in this file
import particle, { update } from './particle'

const getLogger = (c, height) => {
    const log = (msg) => {
        if (!msg) { 
            log.x = 30
            log.y = height
        }
        const pt = 16
        c.font = `${pt}px Courier`
        c.fillStyle = "white"
        c.fillText(msg, log.x, log.y)
        log.y = log.y - (4 + pt)
    }
    return log
}

const frameUpdate = (cb) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        const diff = ~~(time - (rAF.lastTime || 0)) // ~~ is like floor
        cb(diff)
        rAF.lastTime = time
    }
    rAF() // go!
}

window.onload = () => {
    const canvas = document.getElementById('app')
    const c = canvas.getContext("2d")
    let particles = Array(5).fill(true).map(() => particle())
    const log = getLogger(c, canvas.height)
    frameUpdate((dt) => {
        particles = particles.map((p) => update(p, dt, canvas))

        log()
        c.fillStyle = '#000'
        c.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach(({position, mass}) => {
            const [x, y] = position
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(x, y, mass, 0, 2 * Math.PI)
            c.fill()
            log(`(${mass.toFixed(2)}) @ (${x.toFixed(6)}, ${y.toFixed(6)})`)
        })
    })
}
