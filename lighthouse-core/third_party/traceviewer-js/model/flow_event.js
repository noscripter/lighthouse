"use strict";
/**
Copyright (c) 2013 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/unit.js");
require("./timed_event.js");

'use strict';

/**
 * @fileoverview Provides the Flow class.
 */
global.tr.exportTo('tr.model', function () {
  /**
   * A Flow represents an interval of time plus parameters associated
   * with that interval.
   *
   * @constructor
   */
  function FlowEvent(category, id, title, colorId, start, args, opt_duration) {
    tr.model.TimedEvent.call(this, start);

    this.category = category || '';
    this.title = title;
    this.colorId = colorId;
    this.start = start;
    this.args = args;

    this.id = id;

    this.startSlice = undefined;
    this.endSlice = undefined;

    this.startStackFrame = undefined;
    this.endStackFrame = undefined;

    if (opt_duration !== undefined) this.duration = opt_duration;
  }

  FlowEvent.prototype = {
    __proto__: tr.model.TimedEvent.prototype,

    get userFriendlyName() {
      return 'Flow event named ' + this.title + ' at ' + tr.b.Unit.byName.timeStampInMs.format(this.timestamp);
    }
  };

  tr.model.EventRegistry.register(FlowEvent, {
    name: 'flowEvent',
    pluralName: 'flowEvents'
  });

  return {
    FlowEvent: FlowEvent
  };
});