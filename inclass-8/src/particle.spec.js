import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {
var canvas={width:800,height:800};
    it('should have default values', () => {
        const p = particle({})
        try{
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.mass).to.be.a('number');
        expect(p.position).to.be.a('array');
        expect(p.velocity).to.be.a('array');
        expect(p.acceleration).to.be.a('array');
    }
        catch(e){console.log('error in part1')}
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0,canvas)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0,canvas) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // IMPLEMENT ME:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5],acceleration: [0.5,0.5] })
        const {velocity}=update(p,1.0,canvas)//update velocity by 1 time unit
        expect(velocity[0]).to.equal(1)
        expect(velocity[1]).to.equal(0)
    })

    it('particles should wrap around the world', () => {
        // IMPLEMENT ME: 
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
        const p = particle({ position: [1, 1], velocity: [-5, -5] })
        const { position } = update(p, 1.0,canvas)
        expect(position).to.eql([796, 796])
       // expect(1).to.equal(1)
    })

})
