/// <reference types="Cypress" />

// describe("request command suite", () => {
//   it("Get request", () => {
//     cy.request("http://localhost:8080/todos?id=1").then((response) => {
//       cy.log(response.body);
//       //expect(response.status).to.be.eq(200);
//       //expect(response.duration).to.be.below(20000);
//       expect(response.body[0].isComplete).to.be.false;
//     });
//   });
// });

// KAN ook zoe, door een object te maken in the request
// describe("request command suite", () => {
//   it("Get request", () => {
//     cy.request({
//       method: "GET",
//       url: "http://localhost:8080/todos",
//       qs: { id: 1 },
//       //with qs you add the parameters that you want to send along with the request
//     }).then((response) => {
//       cy.log(response.statusText);
//       expect(response.body[0].isComplete).to.be.false;
//     });
//   });
// });

describe("request command suite", () => {
  it("Get request", () => {
    cy.visit("http://localhost:3000");
    //cy.log("Hello World");
    cy.request({
      method: "GET",
      url: "http://localhost:8080/todos",
      qs: { id: 1 },
      //with qs you add the parameters that you want to send along with the request
    }).then((response) => {
      cy.log(response.statusText);
      expect(response.body[0].isComplete).to.be.true;
    });
  });
  it("POST request", () => {
    cy.request("POST", "http://localhost:8080/todos", {
      name: "TEST",
      isComplete: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("PUT request", () => {
    cy.request("PUT", "http://localhost:8080/todos/1", {
      name: "Study Cypress",
      id: 1,
      isComplete: true,
    });
  });
  // it("DELETE request", () => {
  //   cy.request("DELETE", "http://localhost:8080/todos/2825");
  // });

  // token via Postman ophalen en toepassing => manier 1
  it("SECURED API request", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8080/courses",
      auth: {
        bearer:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RTZWN1cmVBUElAbWFpbC5jb20iLCJpYXQiOjE2MjI3MDUxNDQsImV4cCI6MTYyMjcwODc0NCwic3ViIjoiNSJ9.ZgBRHqA69TRqOq_joJ71ESB2oGt_jLF5M_X-qN5NEPM",
      },
    });
  });

  // token via Postman ophalen en toepassing => manier 2
  // it("SECURED API request", () => {
  //   cy.request({
  //     method: "GET",
  //     url: "http://localhost:8080/courses",
  //     headers: {
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RTZWN1cmVBUElAbWFpbC5jb20iLCJpYXQiOjE2MjI3MDUxNDQsImV4cCI6MTYyMjcwODc0NCwic3ViIjoiNSJ9.ZgBRHqA69TRqOq_joJ71ESB2oGt_jLF5M_X-qN5NEPM",
  //     },
  //   });
  // });
});
