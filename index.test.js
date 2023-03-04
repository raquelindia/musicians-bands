const {sequelize} = require('./db');
const {Band, Musician} = require('./index');
const { Song } = require('./Song');

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
       
      
    })

    test('tests associations', async () => {
    const exampleBand = await Band.create({ name: 'XTC', genre: 'Electronic'});
    const exampleMusician1 = await Musician.create({ name: "Chris", instrument: "Trumpet"});
    const exampleMusician2 = await Musician.create({ name: "Alex", instrument: "Guitar"});
    await exampleBand.setMusicians([exampleMusician1, exampleMusician2]);
    const foundBand = await Band.findAll({ include: Musician});
    const foundMusician = await Musician.findAll();
    
    const musicianOnePath = foundBand[1].musicians[1].name;
    const musicianTwoPath = foundBand[1].musicians[0].name;
   
   
    expect(foundBand.length).toBe(2);
    expect(foundMusician.length).toBe(3);
    expect(musicianOnePath).toBe("Chris");
    expect(musicianTwoPath).toBe("Alex");
    

});

test('test song model', async () => {
    const createSong = await Song.create({ title: "Cha-Cha Slide", year: 2005});

    expect(createSong.title).toBe("Cha-Cha Slide");
    expect(createSong.year).toBe(2005);
})

});