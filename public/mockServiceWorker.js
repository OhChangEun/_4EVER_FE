/* eslint-disable */
/* MSW v2 service worker */
const INTEGRITY_CHECKSUM = '2a29c7a8a6a98a1a1a8e6f2c2a2f3f6a';
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse');

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', async (event) => {
  if (!event.data) return;

  switch (event.data.type) {
    case 'INTEGRITY_CHECK_REQUEST': {
      event.ports[0].postMessage({
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      });
      break;
    }
    case 'MOCK_ACTIVATE': {
      self.__MSW_ACTIVATED__ = true;
      event.ports[0].postMessage({ type: 'MOCKING_ENABLED' });
      break;
    }
    case 'MOCK_DEACTIVATE': {
      self.__MSW_ACTIVATED__ = false;
      break;
    }
    case 'CLIENT_CLOSED': {
      const clientId = event.data.clientId;
      const client = await self.clients.get(clientId);
      if (!client) return;
      const allClients = await self.clients.matchAll();
      if (allClients.length === 0) {
        self.__MSW_ACTIVATED__ = false;
      }
      break;
    }
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (!self.__MSW_ACTIVATED__) {
    return;
  }

  if (request.mode === 'navigate') {
    return;
  }

  event.respondWith(handleRequest(event, request));
});

async function handleRequest(event, request) {
  const client = await self.clients.get(event.clientId);

  if (!client) {
    return fetch(request);
  }

  const requestId = crypto.randomUUID();
  const requestClone = request.clone();

  const requestJson = await serializeRequest(requestClone);

  const { response: mockedResponse } = await sendToClient(client, {
    type: 'REQUEST',
    payload: {
      id: requestId,
      request: requestJson,
    },
  });

  if (mockedResponse) {
    return mockedResponse;
  }

  return fetch(request);
}

async function serializeRequest(request) {
  const headers = {};
  request.headers.forEach((value, name) => {
    headers[name] = value;
  });

  const body = await request.text();

  return {
    id: request.url,
    url: request.url,
    method: request.method,
    headers,
    body,
  };
}

function sendToClient(client, message) {
  return new Promise((resolve) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = async (event) => {
      const { type, payload } = event.data;

      if (type === 'MOCK_RESPONSE') {
        const mockedResponse = payload ? await deserializeResponse(payload) : null;
        return resolve({ response: mockedResponse });
      }

      if (type === 'PASSTHROUGH') {
        return resolve({ response: null });
      }
    };

    client.postMessage(message, [channel.port2]);
  });
}

async function deserializeResponse(response) {
  const { status, statusText, headers, body, bodyUsed } = response;

  const responseHeaders = new Headers(headers);
  const responseBody = bodyUsed ? null : body;

  const mockedResponse = new Response(responseBody, {
    status,
    statusText,
    headers: responseHeaders,
  });

  mockedResponse[IS_MOCKED_RESPONSE] = true;
  return mockedResponse;
}
