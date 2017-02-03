const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
    
    mass=mass;

    position[0]+=canvas.width;//prevent negative coordinate
    position[1]+=canvas.height;
    position[0]=(velocity[0]*delta*1.0+position[0])%canvas.width;
    position[1]=(position[1]+velocity[1]*delta*1.0)%canvas.height;
    velocity[0]=velocity[0]+acceleration[0]*delta;
    velocity[1]=velocity[1]+acceleration[1]*delta;
    acceleration=acceleration; 

	// IMPLEMENT ME
    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
