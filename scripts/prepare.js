const { execSync } = require('child_process');

const isCi = Boolean(process.env.CI) || Boolean(process.env.VERCEL);

if (isCi) {
  process.exit(0);
}

execSync('husky install', { stdio: 'inherit' });
