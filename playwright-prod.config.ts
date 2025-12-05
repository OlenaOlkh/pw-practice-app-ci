import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require ('dotenv').config();

export default defineConfig<TestOptions>({
   use:{
  globalsQaURL: 'https://www.globalte/dragand', 
  baseURL: 'http://localhost:4200',
    },    
  projects: [
    {
      name: 'chromium',      
    }    
  ]
});
