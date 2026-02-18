import {test, expect} from '@playwright/test';

test('API Sample Test', async ({request}) => 
    {
    const response = await request.get('https://fake-json-api.mock.beeceptor.com/users');
    expect(response.status()).toBe(200);
    const data = await response.json();
    data.forEach(user => { 
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
    });
    // expect(data).toHaveProperty('id', 1);
    // expect(data).toHaveProperty('title');
    // expect(data).toHaveProperty('body');
});
