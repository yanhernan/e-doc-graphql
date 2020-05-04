import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

// resolvers
import { TemplateResolver } from "./resolvers/Template";
import { QuestionResolver } from "./resolvers/Question";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TemplateResolver, QuestionResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({ schema, introspection: true, playground: { settings: { "editor.theme": "dark" } } });
  const app: any = Express();
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};
main().catch((error) => {
  console.log(error, "error");
});
