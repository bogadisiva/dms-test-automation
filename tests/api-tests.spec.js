import {test, expect} from '@playwright/test';


test.skip('API Sample Test', async ({request}) => 
    {
    const response = await request.get('https://fake-json-api.mock.beeceptor.com/users');
    expect(response.status()).toBe(200);
    const data = await response.json();
    data.forEach(user => { 
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        console.log(`User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
    // expect(data).toHaveProperty('id', 1);
    // expect(data).toHaveProperty('title');
    // expect(data).toHaveProperty('body');
});
test('Test Should create a bug report', async ({request}) =>
    {
            // repoUrl: 'https://api.github.com',
            // request.
             userName= 'bogadisiva';
             password='JoshAlti@12358!';
               const newIssue = await request.post(`https://api.github.com/repos/${bogadisiva}/${Feb02072018_Siva}/issues`, {
                auth: {
                    username: userName,
                    password: password
                },
                data: {
                    title: 'Bug Report',
                    body: 'This is a bug report created using Playwright API testing.'
                }
            });
            expect(newIssue.status()).toBe(201);
            const issueData = await newIssue.json();
            console.log(`Created Issue: ${issueData.title} with ID: ${issueData.id}`);   
    });
