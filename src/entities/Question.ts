import * as TypeGraph from "type-graphql";
import { IQuestion } from "../config/templates";

@TypeGraph.ObjectType({ description: "The Question model" })
export class Question implements IQuestion {
  @TypeGraph.Field()
  type: string;

  @TypeGraph.Field({ nullable: true })
  placeholder: string;

  @TypeGraph.Field()
  validation: string;
}
