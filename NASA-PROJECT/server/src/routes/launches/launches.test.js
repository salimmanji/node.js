const request = require('supertest');
const app = require('../../app');

describe('TEST GET /launches', () => {
    test('Should return a 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/) //js regex
            .expect(200);
    })
})

describe('Test POST /launch', () => {
    const completeLaunchData = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2029',
    };

    const launchDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
    };

    const launchWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
        launchDate: 'hello',
    }

    test('Should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/) //js regex
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('Should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/) //js regex
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property.",
        });
    });

    test('Should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchWithInvalidDate)
            .expect('Content-Type', /json/) //js regex
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid launch date.",
        });
    });
})