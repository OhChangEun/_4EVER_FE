let started = false;

export async function setupMocks() {
  if (started) return;
  if (typeof window === 'undefined') return;
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') return;

  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledRequest: 'warn',
  });
  started = true;
}
