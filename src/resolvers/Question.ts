import { Resolver, Arg, Query } from "type-graphql";
import { buildQuestion } from "../builders/builder-doc";
import { Field } from "../entities/Field";

@Resolver()
export class QuestionResolver {
  @Query(() => [Field])
  questions(@Arg("name") name: string) {
    return buildQuestion(name);
  }

}
