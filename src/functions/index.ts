export const functions = {
  hello: {
    handler: "src/functions/hello.handler",
    events: [
      {
        http: {
          method: "GET",
          path: "/hello",
          cors: true,
        },
      },
    ],
  },
};
