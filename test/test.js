let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.use(chaiHttp).should();

describe("API Test", () => {
  beforeEach(done => {
    done();
  });

  describe("/GET characters", () => {
    it("it should GET all the characters", done => {
      chai
        .request(server)
        .get("/characters")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
  });

  describe("/GET characters by ID", () => {
    it("it should return a specific character", done => {
      chai
        .request(server)
        .get("/characters/1011334")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.name.should.be.eql("3-D Man");
          done();
        });
    });
  });

  describe("/GET characters by incorrect ID", () => {
    it("it should throw an error", done => {
      chai
        .request(server)
        .get("/characters/123")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
