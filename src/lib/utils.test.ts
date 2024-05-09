import { cn, getLangFromPathname } from './utils';

describe('cn', () => {
  it('should return a string with merged class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should return an empty string if no class names are provided', () => {
    const result = cn();
    expect(result).toBe('');
  });
});

describe('getLangFromPathname', () => {
  it('should return the language from the given pathname', () => {
    const result = getLangFromPathname('/en/some/path');
    expect(result).toBe('en');
  });

  it('should return an empty string if the pathname is empty', () => {
    const result = getLangFromPathname('');
    expect(result).toBe('');
  });
});
