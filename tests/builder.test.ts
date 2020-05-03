import {
  buildQuestion,
  buildDoc,
  generateDoc,
} from "../src/builders/builder-doc";
import { expect } from "chai";
import fs from "fs";

describe("Build Documents", () => {
  it("Build Questions Contract", () => {
    const questions = buildQuestion("contract");
    expect(questions).to.not.equal(null);
    let questionRepeat: { [key: string]: number } = {};
    questions.forEach((q) => {
      if (!questionRepeat[q.key]) {
        questionRepeat[q.key] = 1;
      } else {
        questionRepeat[q.key] += 1;
      }
    });
    expect(Object.keys(questionRepeat).length).to.equals(questions.length);
  });
  it("Build Template Contract", () => {
    const res = buildDoc(
      "contract",
      [
        {
          key: "COLOCAR MONTO DIARIO INTEGRADO DEL SALARIO",
          value: "52.000 MEX",
        },
      ],
      { lang: "es" }
    );

    expect(res).to.not.contain("[COLOCAR MONTO DIARIO INTEGRADO DEL SALARIO]");
  });
  it("Generate Template Contract", async () => {
    const res = await generateDoc(
      "contract",
      [
        {
          key: "COLOCAR TIPO DE CONTRATO",
          value: "Simple",
        },
        {
          key: "COLOCAR MONTO DIARIO INTEGRADO DEL SALARIO",
          value: "52.000 MEX",
        },
      ],
      { lang: "es", stream: false, output: undefined }
    ) as string;
    const exist = fs.existsSync(res);
    expect(exist).to.be.eq(true);
    fs.unlinkSync(res);
  });
});
