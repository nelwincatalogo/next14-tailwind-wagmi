import { type Wallet, type WalletDetailsParams } from '@rainbow-me/rainbowkit';
import { waypoint } from '@sky-mavis/tanto-wagmi';

export interface RoninWaypointWalletOptions {
  clientId: string;
  chainId: number;
  projectId?: string;
}

export const roninWaypointWallet = (options: RoninWaypointWalletOptions): Wallet => ({
  id: 'ronin-waypoint',
  name: 'Ronin Waypoint',
  iconUrl: 'https://cdn.roninchain.com/assets/brand-assets/logo/logo.png',
  iconBackground: '#0c2f78',
  downloadUrls: {
    chrome: 'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
    browserExtension: 'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
  },
  installed: true,
  createConnector: (walletDetails: WalletDetailsParams) => {
    // Create the Waypoint connector
    return waypoint({
      clientId: options.clientId,
      chainId: options.chainId,
      scopes: ['wallet', 'profile', 'openid'],
    });
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://docs.skymavis.com/mavis/ronin-waypoint',
      steps: [
        {
          description: 'Ronin Waypoint allows you to connect with your Google account.',
          step: 'install',
          title: 'Connect with Google',
        },
        {
          description: 'After you sign in, a connection prompt will appear for you to connect your wallet.',
          step: 'create',
          title: 'Sign in with Google',
        },
      ],
    },
  },
});
