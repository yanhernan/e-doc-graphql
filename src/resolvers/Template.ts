import { Resolver, Arg, Query } from "type-graphql";
import { buildQuestion, findTemplate } from "../builders/builder-doc";
import { Field } from "../entities/Field";
import { Template } from "../entities/Template";

@Resolver()
export class TemplateResolver {

  @Query(() => Template)
  template(@Arg("name") name: string) {
    return findTemplate(name);
  }
}
