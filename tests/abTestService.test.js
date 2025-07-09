import { getAbTestStats } from '../helpers/abTestService';

describe('AB Test Service', () => {
  it('returns stats object with expected fields', async () => {
    const stats = await getAbTestStats('test123');
    expect(stats).toHaveProperty('testId', 'test123');
    expect(stats).toHaveProperty('impressions');
    expect(stats).toHaveProperty('clicks');
    expect(stats).toHaveProperty('conversionRate');
    expect(stats).toHaveProperty('users');
  });
});
