import test from 'node:test'
import assert from "assert";


import { Client } from 'discord.js'

import {client} from '../src/app.js'

test.describe("Discord Client Integration Tests", () => {
  test.it("should be an instance of Discord.js Client", () => {
    assert(
      client instanceof Client,
      "Client is not an instance of Discord.js Client"
    );
  });

  test.it("should be defined", () => {
    assert.notStrictEqual(client, undefined, "Client is not defined");
  });

  
});
