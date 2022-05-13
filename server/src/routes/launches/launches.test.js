const request = require('supertest');
const app = require('../../app');
const {startMongoDB, mongoDisconnect} = require('../../../services/mongo')

describe("Launches v1 API tests",  () => {
    beforeAll(async () => {
         await startMongoDB();
    });
    afterAll(async () => {
         await mongoDisconnect();
    });
    const url = '/api/v1/launches'

    describe("Test GET /launches", ()=> {
        test("It should respond with 200", async ()=> {
            const response = await request(app)
                .get(url)
                .expect((res)=> {
                    if(!Array.isArray(res.body)) {
                        throw new Error("Response it expected to be an array.")
                    }
                })
                .expect(200)
        })
    })

    describe("Test POST /launches",  () => {
        const launchData = {
            launch_date: 'December 27, 2050',
            mission_name: "AutoTest mis name",
            rocket_type: "My rocket type",
            destination_planet: "626b73739e71083bd57d4d5d"
        }
        test('It should respond with 201 success',async () => {
            const response = await request(app)
                .post(url)
                .send(launchData)
                .expect(function (res) {
                    if(res.body.newLaunch.mission_name !==  "AutoTest mis name"){
                        throw new Error("missing mission_name key")
                    }
                })
                .expect(201)

        })
        test('It should catch missing requires properties with 400', async () => {
            const newLaunchData  = JSON.parse(JSON.stringify(launchData))

            newLaunchData.launch_date = null;
            const response = await request(app)
                .post(url)
                .send(newLaunchData)
                .expect(400)
                .expect(res => {
                    if(res.body.error != "Missing required property.") {
                        throw new Error("Wrong error message.")
                    }

                })

        })
        test('It should catch invalid dates with 400', async ()=> {
            const newLaunchData  = JSON.parse(JSON.stringify(launchData));
            newLaunchData.launch_date = 'wrong_date'
            const response = await request(app)
                .post(url)
                .send(newLaunchData)
                .expect(400)
                .expect(res => {
                    if(res.body.error !== "Invalid date format"){
                        throw new Error("Wrong error message when invalid date format is passed from user.")
                    }
                })
        })
    })
})

