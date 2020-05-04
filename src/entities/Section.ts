import { ISection } from "../config/templates";
import * as TypeGraph from "type-graphql";
import { ObjectType } from "type-graphql";
import { Field } from "./Field";
@ObjectType({ description: "The Template model" })
export class Section implements ISection {
  @TypeGraph.Field()
  name: string;

  @TypeGraph.Field(returns => [Field], { nullable: true })
  fields: Field[];

  @TypeGraph.Field((type) => [String])
  content: string[];

  @TypeGraph.Field({ nullable: true })
  optional?: boolean;
}
