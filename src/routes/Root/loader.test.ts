import { describe, it, expect, vi } from 'vitest';
import i18n from '@/i18n/config';
import loader from './loader';

describe('loader', () => {
  it('should change the language if it is different from the current language', async () => {
    const spyChangeLanguage = vi.spyOn(i18n, 'changeLanguage');
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response),
    );

    await loader({
      request: {} as Request,
      params: {
        lng: 'sv',
      },
    });

    expect(spyChangeLanguage).toHaveBeenCalledWith('sv');
  });
});
