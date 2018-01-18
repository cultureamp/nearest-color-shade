const { expect } = require('chai');
const nearest = require('../index');
const Color = require('color');

describe('nearest', () => {
  describe('no color', () => {
    const brandColors = {};

    it('should return null', () => {
      expect(nearest(brandColors, Color('#000000'))).to.be.null;
    });
  });

  describe('single color', () => {
    const brandColors = {
      coral: Color('#f04c5d'),
    };

    it('should return the brand color', () => {
      expect(nearest(brandColors, Color('#000000'))).to.eql({
        color: 'coral',
      });
    });
  });

  describe('exact match', () => {
    const brandColors = {
      coral: Color('#f04c5d'),
      seedling: Color('#45ad8f'),
    };

    describe('for coral', () => {
      it('should return the matching color', () => {
        expect(nearest(brandColors, Color('#f04c5d'))).to.eql({
          color: 'coral',
        });
      });
    });

    describe('for seedling', () => {
      it('should return the matching color', () => {
        expect(nearest(brandColors, Color('#45ad8f'))).to.eql({
          color: 'seedling',
        });
      });
    });
  });
});
