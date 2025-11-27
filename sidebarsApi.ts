import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import userSidebar from './api_docs/user/sidebar';
import contractSidebar from './api_docs/contract/sidebar';

const sidebars: SidebarsConfig = {
  api: [
    {
      type: 'category',
      label: 'User',
      items: userSidebar,
    },
    {
      type: 'category',
      label: 'Contract',
      items: contractSidebar,
    }
  ],
};

export default sidebars;
