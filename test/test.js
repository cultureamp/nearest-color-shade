const { expect } = require('chai');
const nearest = require('../index');
const Color = require('color');

describe('nearest', () => {
  const brandColors = {
    coral: Color('#f04c5d'),
    seedling: Color('#45ad8f'),
  };

  describe('exact match', () => {
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

  describe('exact shade (added black)', () => {
    it('it should return the matching shade of coral', () => {
      expect(
        nearest(brandColors, Color('#f04c5d').mix(Color('black'), 0.5))
      ).to.eql({
        color: 'coral',
        shade: 0.5,
      });
    });

    it('it should return the matching shade of seedling', () => {
      expect(
        nearest(brandColors, Color('#45ad8f').mix(Color('black'), 0.5))
      ).to.eql({
        color: 'seedling',
        shade: 0.5,
      });
    });
  });

  describe('exact tint (added white)', () => {
    it('it should return the matching tint', () => {
      expect(
        nearest(brandColors, Color('#f04c5d').mix(Color('white'), 0.5))
      ).to.eql({
        color: 'coral',
        tint: 0.5,
      });
    });
  });

  describe.only('similar hue', () => {
    it('should match a lesser hue', () => {
      expect(nearest(brandColors, brandColors.coral.hue(350)).color).to.eq(
        'coral'
      );
    });

    it('should match a greater hue', () => {
      expect(nearest(brandColors, brandColors.coral.hue(355)).color).to.eq(
        'coral'
      );
    });

    it('should match a similar hue with a different sign', () => {
      expect(nearest(brandColors, brandColors.coral.hue(10)).color).to.eq(
        'coral'
      );
    });
  });

  describe('no brand colors', () => {
    const brandColors = {};

    it('should return null', () => {
      expect(nearest(brandColors, Color('#000000'))).to.be.null;
    });
  });
});
