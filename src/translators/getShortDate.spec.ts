import getShortDate from './getShortDate';

describe('getShortDate', () => {
  describe('when navigator.language is defined', () => {
    it('should translate given date to native format date', () => {
      jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('es-ES');

      const result = getShortDate(new Date('2022-11-12T19:36:27.995Z'));

      expect(result).toBe('12/11/2022');
    });
  });

  describe('when navigator.language is undefined', () => {
    it('should translate given date to default en-US format', () => {
      jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('');

      const result = getShortDate(new Date('2022-11-12T19:36:27.995Z'));

      expect(result).toBe('11/12/2022');
    });
  });
});
