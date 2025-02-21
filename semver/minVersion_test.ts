// Copyright Isaac Z. Schlueter and Contributors. All rights reserved. ISC license.
// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { assert } from "../testing/asserts.ts";
import * as semver from "./mod.ts";

Deno.test("minVersion", function (): void {
  // [range, version]
  const versions: [string, string | null][] = [
    // Stars
    ["*", "0.0.0"],
    ["* || >=2", "0.0.0"],
    [">=2 || *", "0.0.0"],
    [">2 || *", "0.0.0"],

    // equal
    ["1.0.0", "1.0.0"],
    ["1.0", "1.0.0"],
    ["1.0.x", "1.0.0"],
    ["1.0.*", "1.0.0"],
    ["1", "1.0.0"],
    ["1.x.x", "1.0.0"],
    ["1.x.x", "1.0.0"],
    ["1.*.x", "1.0.0"],
    ["1.x.*", "1.0.0"],
    ["1.x", "1.0.0"],
    ["1.*", "1.0.0"],
    ["=1.0.0", "1.0.0"],

    // Tilde
    ["~1.1.1", "1.1.1"],
    ["~1.1.1-beta", "1.1.1-beta"],
    ["~1.1.1 || >=2", "1.1.1"],

    // Carot
    ["^1.1.1", "1.1.1"],
    ["^1.1.1-beta", "1.1.1-beta"],
    ["^1.1.1 || >=2", "1.1.1"],

    // '-' operator
    ["1.1.1 - 1.8.0", "1.1.1"],
    ["1.1 - 1.8.0", "1.1.0"],

    // Less / less or equal
    ["<2", "0.0.0"],
    ["<0.0.0-beta", "0.0.0-0"],
    ["<0.0.1-beta", "0.0.0"],
    ["<2 || >4", "0.0.0"],
    [">4 || <2", "0.0.0"],
    ["<=2 || >=4", "0.0.0"],
    [">=4 || <=2", "0.0.0"],
    ["<0.0.0-beta >0.0.0-alpha", "0.0.0-alpha.0"],
    [">0.0.0-alpha <0.0.0-beta", "0.0.0-alpha.0"],

    // Greater than or equal
    [">=1.1.1 <2 || >=2.2.2 <2", "1.1.1"],
    [">=2.2.2 <2 || >=1.1.1 <2", "1.1.1"],

    // Greater than but not equal
    [">1.0.0", "1.0.1"],
    [">1.0.0-0", "1.0.0-0.0"],
    [">1.0.0-beta", "1.0.0-beta.0"],
    [">2 || >1.0.0", "1.0.1"],
    [">2 || >1.0.0-0", "1.0.0-0.0"],
    [">2 || >1.0.0-beta", "1.0.0-beta.0"],

    // Impossible range
    [">4 <3", null],
  ];

  versions.forEach(function (tuple) {
    const range = tuple[0];
    const version = tuple[1];
    const msg = `minVersion(${range}) = ${version}`;
    const min = semver.minVersion(range);
    assert((min as null) === version || (min && min.version === version), msg);
  });
});
