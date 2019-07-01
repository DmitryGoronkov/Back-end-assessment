
var app = require('../app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
var request = require('supertest')
var expect = chai.expect;
should = chai.should();
// chai.use(require('chai-like'));
// chai.use(require('chai-things'));

chai.use(chaiHttp);
describe('Posts with tech tag', function() {
    it("returns a result for posts with tech tags", function() {
        return chai.request('http://localhost:8080')
            .get("/api/posts?tags=tech")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('tags');
                expect(res.body[0].tags).to.include('tech');
        });
    });
});
describe('Posts with history tag', function() {
    it("returns a result for posts with history tags", function() {
        return chai.request('http://localhost:8080')
            .get("/api/posts?tags=history")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('tags');
                expect(res.body[0].tags).to.include('history');
        });
    });
});
describe ("tech and history", function (){
    it("check if history and tech is there", function (done){
        request(app).get("/api/posts?tags=history,tech")
            .expect(200)
            .expect(/"tech","history"/,done)
    })
})
// describe('Posts with tech tag or history', function() {
//     it("returns a result for posts with tech tags", function() {
//         return chai.request('http://localhost:8080')
//             .get("/api/posts?tags=tech")
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 // expect(res.body[0]).to.have.property('tags');
//                 expect(res.body).should.include.something.that.deep.equals( "history, tech")
//         });
//     });
// });