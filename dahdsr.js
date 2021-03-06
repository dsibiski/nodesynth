// Generated by CoffeeScript 1.10.0
(function() {
  var DAHDSREnvelope;

  DAHDSREnvelope = (function() {
    DAHDSREnvelope.prototype.delay = 0;

    DAHDSREnvelope.prototype.attack = 0;

    DAHDSREnvelope.prototype.hold = 0;

    DAHDSREnvelope.prototype.decay = 0;

    DAHDSREnvelope.prototype.sustain = 0;

    DAHDSREnvelope.prototype.release = 0;

    DAHDSREnvelope.prototype.pressed = false;

    DAHDSREnvelope.prototype.pressedAt = null;

    DAHDSREnvelope.prototype.releasedAt = null;

    DAHDSREnvelope.prototype.releaseStart = null;

    function DAHDSREnvelope(delay, attack, hold, decay, sustain, release) {
      this.delay = delay;
      this.attack = attack;
      this.hold = hold;
      this.decay = decay;
      this.sustain = sustain;
      this.release = release;
    }

    DAHDSREnvelope.prototype.tap = function(time) {
      if (time == null) {
        time = this.last;
      }
      this.pressedAt = time;
      return this.releasedAt = time;
    };

    DAHDSREnvelope.prototype.press = function(time) {
      if (time == null) {
        time = this.last;
      }
      this.pressed = true;
      this.pressedAt = time;
      return this.releasedAt = null;
    };

    DAHDSREnvelope.prototype.release = function(time) {
      if (time == null) {
        time = this.last;
      }
      this.pressed = false;
      return this.releasedAt = time;
    };

    DAHDSREnvelope.prototype.valueAt = function(time) {
      var offset;
      this.last = time;
      if (this.pressedAt === null) {
        return 0;
      }
      if (this.releaseStart === null) {
        offset = time - this.pressedAt;
        if (offset < this.delay) {
          return 0;
        }
        offset -= this.delay;
        if (offset < this.attack) {
          return offset / this.attack;
        }
        offset -= this.attack;
        if (offset < this.hold) {
          return 1;
        }
        offset -= this.hold;
        if (offset < this.decay) {
          return 1 - ((1 - this.sustain) * (offset / this.decay));
        }
        offset -= this.decay;
        if (this.pressed) {
          return this.sustain;
        }
        this.releaseStart = time;
      }
      offset = time - this.releaseStart;
      if (offset > this.release) {
        this.pressedAt = this.releasedAt = this.releaseStart = null;
        return 0;
      }
      return this.sustain - ((offset / this.release) * this.sustain);
    };

    return DAHDSREnvelope;

  })();

  module.exports = DAHDSREnvelope;

}).call(this);

//# sourceMappingURL=dahdsr.js.map
