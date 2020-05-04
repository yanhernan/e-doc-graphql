import Templates, { ITemplate, IAnswer, IField } from "../config/templates";
import fs from "fs";
import moment from "moment";
import pdf from "html-pdf";
import "moment/locale/es";

export const generateDoc = async (
  template: string,
  params: IAnswer[],
  options:
    | { lang: string; output: string | undefined; stream: boolean | undefined }
    | undefined = { lang: "en", output: undefined, stream: undefined }
) => {
  const strDoc = buildDoc(template, params, options);
  const time = new Date().getTime();
  const filename = `./${time}.pdf`;
  const res = await new Promise<string | fs.ReadStream>((resolve, reject) => {
    const generator = pdf.create(strDoc);
    const isStream = options && options.stream;
    if (!isStream) {
      generator.toFile(
        options ? options.output || filename : filename,
        (err, res) => {
          if (!err) {
            resolve(res.filename);
          } else {
            reject(err.message);
          }
        }
      );
    } else {
      generator.toStream((err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      });
    }
  });
  return res;
};

export const buildDoc = (
  template: string,
  params: IAnswer[],
  options: { lang: string } | undefined = undefined
) => {
  if (options) {
    moment.locale(options.lang);
  }
  params.push({
    key: "CurrentDay",
    value: moment().format("DD"),
  });
  params.push({
    key: "CurrentMonth",
    value: moment().format("MMM"),
  });
  params.push({
    key: "CurrentYear",
    value: moment().format("YYYY"),
  });
  const tmpl = findTemplate(template);
  let content = "";
  for (let i = 0; i < tmpl.sections.length; i += 1) {
    let section = "";
    section = (tmpl.sections[i].content as string[]).reduce(
      (a, c) => a + c,
      ""
    );

    const fields = tmpl.sections[i].fields;
    if (fields) {
      fields.forEach((f) => {
        const answer = params.find((p) => p.key === f.key);
        if (answer) {
          section = section.replace(`[${f.key}]`, answer.value as string);
        }
      });
    } else {
      params.forEach((a) => {
        section = section.replace(`[${a.key}]`, a.value as string);
      });
    }
    content += `<div>${section}</div>`;
  }
  return content;
};

export const buildQuestion = (template: string) => {
  const tmpl = findTemplate(template);
  const resPrevious = tmpl.sections.reduce(
    (a, c) => a.concat(c.fields || []),
    [] as IField[]
  );
  const res: IField[] = [];
  const indexes: { [key: string]: number } = {};
  resPrevious.forEach((f) => {
    if (!indexes[f.key]) {
      indexes[f.key] = Object.keys(indexes).length;
      res.push(f);
    }
  });
  return res.filter((f) => f.label);
};

export const findTemplate = (template: string) => {
  if (template in Templates) {
    const templateSelect: ITemplate = (Templates as any)[template];
    return templateSelect;
  } else {
    throw new Error("name template not found");
  }
};
