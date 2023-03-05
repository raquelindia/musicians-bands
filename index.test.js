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
    const foundBand = await Band.findAll({ include: [{model: Musician, as: 'musicians'} ] });
    
    const foundMusician = await Musician.findAll();
    
    const musicianOnePath = foundBand[1].musicians[1].name;
    const musicianTwoPath = foundBand[1].musicians[0].name;
   
   
    expect(foundBand.length).toBe(2);
    expect(foundMusician.length).toBe(3);
    expect(musicianOnePath).toBe("Chris");
    expect(musicianTwoPath).toBe("Alex");
    

});

test('test song model', async () => {
    
    const createSong1 = await Song.create({ title: "Cha-Cha Slide", year: 2005});
    const createSong2 = await Song.create({ title: "Twinkle Twinkle Little Star", year: 1930});
    const createSong3 = await Song.create({ title: "Jingle Bells", year: 1995});
    const foundSong = await Song.findAll({ include: [{ model: Band, as: 'bands'}]});
    const foundBand = await Band.findAll({ include: [{ model: Song, as: 'songs'}, {model: Musician, as: 'musicians'}]});
    

 
    const bandOne = foundBand[0];
    const bandTwo = foundBand[1];
   

    // await foundBand.setSongs([createSong1, createSong2, createSong3]);
    await createSong1.addBand(bandOne);
    await createSong1.addBand(bandTwo);
    await bandOne.addSong(createSong1);
    await bandOne.addSong(createSong2);
    await bandOne.addSong(createSong3);
  const bands1 = await createSong1.getBands();
  const songs1 = await bandOne.getSongs();
  const loadedBand = await Band.findOne({
    where: {
        id: bandOne.id
    },
    include: Song
})



    expect(loadedBand.songs.length).toBe(3); 
    expect(loadedBand.songs[0].title).toBe('Cha-Cha Slide');
    expect(loadedBand.songs[0].year).toBe(2005);
    expect(bands1.length).toBe(2);
    expect(songs1.length).toBe(3);
    expect(bands1[0].name).toBe("NPS");
    expect(songs1[0].title).toBe("Cha-Cha Slide");
    expect(createSong1.title).toBe("Cha-Cha Slide");
    expect(createSong1.year).toBe(2005);
    expect(createSong2.title).toBe("Twinkle Twinkle Little Star");
    expect(createSong2.year).toBe(1930);
    expect(createSong3.title).toBe("Jingle Bells");
    expect(createSong3.year).toBe(1995);
    
});

});