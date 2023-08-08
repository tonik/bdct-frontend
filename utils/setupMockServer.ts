import type { DefaultBodyType, MockedRequest, RestHandler } from "msw";
import { setupServer } from "msw/node";
import fs from "fs-extra";
import { PactFile, setupPactMswAdapter } from "@pactflow/pact-msw-adapter";

const mergePactFiles = (filePath: string, data: PactFile) => {
  const oldFile: PactFile = fs.existsSync(filePath)
    ? fs.readJSONSync(filePath)
    : {};
  const mergedInteractions = [
    ...(oldFile.interactions || []),
    ...(data.interactions || []),
  ];
  const mergedPacts = {
    ...data,
    interactions: mergedInteractions,
  };

  return mergedPacts;
};

const setupMockServer = (
  handlers: RestHandler<MockedRequest<DefaultBodyType>>[]
) => {
  const server = setupServer(...handlers);
  const mswPact = setupPactMswAdapter({
    server,
    options: {
      consumer: String(process.env.PACT_CONSUMER),
      providers: {
        [String(process.env.PACT_PROVIDER)]: ["users"],
      },
      pactOutDir: "./pacts",
      excludeHeaders: ["x-powered-by"],
    },
  });

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    mswPact.newTest();
  });

  afterEach(() => {
    mswPact.verifyTest();
    server.resetHandlers();
  });

  afterAll(async () => {
    await mswPact.writeToFile((filePath, data: PactFile) => {
      const mergedPacts = mergePactFiles(filePath, data);
      fs.outputFileSync(filePath, JSON.stringify(mergedPacts, null, 2));
    });
    mswPact.clear();
    server.close();
  });

  return server;
};

export default setupMockServer;
