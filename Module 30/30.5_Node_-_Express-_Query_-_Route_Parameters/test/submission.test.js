const fs = require("fs");
const path = require("path");
const app = require("../src/app");
const request = require('supertest');

describe("Speaker Application", () => {
  describe("Routes", () => {
    describe("/say/:greeting", () => {
      it('should respond "Hello!" when request is "/say/Hello"', async () => {
        const response = await request(app).get("/say/Hello");
        expect(response.text).toEqual("Hello!");
      });
            
      it('should respond "Hello, Ted!" when request is "/say/Hello?name=Ted"', async () => {
        const response = await request(app).get("/say/Hello?name=Ted");
        expect(response.text).toEqual("Hello, Ted!");
      });
    });

    describe("/say/welcome", () => {
      it('should respond "Welcome to the server!" when request is "/say/welcome"', async () => {
        const response = await request(app).get("/say/welcome");
        expect(response.text).toEqual("Welcome to the server!");
      });

      it('should respond "Welcome to the server, Ted!" when request is "/say/welcome?name=Ted"', async () => {
        const response = await request(app).get("/say/welcome?name=Ted");
        expect(response.text).toEqual("Welcome to the server, Ted!");
      });
    });

    describe("/say/goodbye", () => {
      it('should respond "We\'re sorry to see you go!" when request is "/say/goodbye"', async () => {
        const greetings = await request(app).get("/say/goodbye");
        expect(greetings.text).toEqual("We're sorry to see you go!");
      });

      it('should respond "We\'re sorry to see you go, Ted!" when request is "/say/goodbye?name=Ted"', async () => {
        const greetings = await request(app).get("/say/goodbye?name=Ted");
        expect(greetings.text).toEqual("We're sorry to see you go, Ted!");
      });
     });
  });
});
