declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ABLY_API_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
