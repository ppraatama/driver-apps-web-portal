import { allure } from 'allure-playwright';

export async function attachRequest(name, request) {

  if (!request) return;

  await allure.attachment(
    `${name} Request`,
    JSON.stringify(request, null, 2),
    'application/json'
  );

}

export async function attachResponse(name, response) {

  if (!response) return;

  await allure.attachment(
    `${name} Response`,
    JSON.stringify(response, null, 2),
    'application/json'
  );

}

export async function attachText(name, text) {

  await allure.attachment(
    name,
    text,
    'text/plain'
  );

}