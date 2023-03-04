const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
       const testBand = await Band.create({ name: 'NPS', genre: 'Disco'});
      
       expect(testBand.name).toBe('NPS');
        expect(testBand.genre).toBe('Disco');
        
        // TODO - test creating a band
        expect(testBand).toBe(testBand);
       // expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })

    test('can create a Musician', async () => {   
        
        const testMusician = await Musician.create({ name: 'Vinh', instrument: 'bass'});
      
        expect(testMusician.name).toBe('Vinh');
        expect(testMusician.instrument).toBe('bass');
       
        // TODO - test creating a musician
       
       // expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })
})