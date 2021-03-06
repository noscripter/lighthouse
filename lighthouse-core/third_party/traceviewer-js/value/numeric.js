"use strict";
/**
Copyright 2016 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/iteration_helpers.js");
require("../base/unit.js");

'use strict';

global.tr.exportTo('tr.v', function () {
  class NumericBase {
    constructor(unit) {
      if (!(unit instanceof tr.b.Unit)) throw new Error('Expected provided unit to be instance of Unit');

      this.unit = unit;
    }

    asDict() {
      var d = {
        unit: this.unit.asJSON()
      };

      this.asDictInto_(d);
      return d;
    }

    static fromDict(d) {
      if (d.type === 'scalar') return ScalarNumeric.fromDict(d);

      throw new Error('Not implemented');
    }
  }

  class ScalarNumeric extends NumericBase {
    constructor(unit, value) {
      if (!(unit instanceof tr.b.Unit)) throw new Error('Expected Unit');

      if (!(typeof value == 'number')) throw new Error('Expected value to be number');

      super(unit);
      this.value = value;
    }

    asDictInto_(d) {
      d.type = 'scalar';

      // Infinity and NaN are left out of JSON for security reasons that do not
      // apply to our use cases.
      if (this.value === Infinity) d.value = 'Infinity';else if (this.value === -Infinity) d.value = '-Infinity';else if (isNaN(this.value)) d.value = 'NaN';else d.value = this.value;
    }

    toString() {
      return this.unit.format(this.value);
    }

    static fromDict(d) {
      // Infinity and NaN are left out of JSON for security reasons that do not
      // apply to our use cases.
      if (typeof d.value === 'string') {
        if (d.value === '-Infinity') {
          d.value = -Infinity;
        } else if (d.value === 'Infinity') {
          d.value = Infinity;
        } else if (d.value === 'NaN') {
          d.value = NaN;
        }
      }

      return new ScalarNumeric(tr.b.Unit.fromJSON(d.unit), d.value);
    }
  }

  return {
    NumericBase: NumericBase,
    ScalarNumeric: ScalarNumeric
  };
});