import { driver } from './selenium'

describe('shutdown', () => {
    it('now', done => driver.close().then(done))
})
