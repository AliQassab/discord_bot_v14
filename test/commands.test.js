import assert from "assert";
import test from "node:test";
import handleCommands from "../src/functions/handlers/handleCommands.js";

test.describe("handleCommands Functionality", () => {
  test.it("should correctly process and register commands", async () => {
    const mockClient = {
      commands: new Map(),
      commandArray: [],
    };

    await handleCommands(mockClient);

    assert.notStrictEqual(
      mockClient.commands.size,
      0,
      "No commands registered"
    );
    assert.notStrictEqual(
      mockClient.commandArray.length,
      0,
      "No commands added to commandArray"
    );
  });
});
