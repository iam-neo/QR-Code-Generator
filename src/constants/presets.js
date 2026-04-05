/**
 * Preset Templates
 * Sample data for quick QR code generation.
 */

export const WIFI_PRESETS = [
  {
    name: 'Home WiFi',
    data: {
      ssid: 'MyHomeNetwork',
      password: 'securePassword123',
      encryption: 'WPA',
      hidden: false,
    },
  },
  {
    name: 'Guest WiFi',
    data: {
      ssid: 'Guest_Network',
      password: 'welcome2024',
      encryption: 'WPA',
      hidden: false,
    },
  },
  {
    name: 'Open Network',
    data: {
      ssid: 'FreePublicWiFi',
      password: '',
      encryption: 'nopass',
      hidden: false,
    },
  },
];

export const VCARD_PRESETS = [
  {
    name: 'Business Card',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-123-4567',
      email: 'john.doe@company.com',
      organization: 'Acme Corporation',
      title: 'Senior Developer',
      website: 'https://johndoe.dev',
      address: '123 Tech Street, Silicon Valley, CA',
    },
  },
  {
    name: 'Personal Card',
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1-555-987-6543',
      email: 'jane.smith@email.com',
      organization: '',
      title: '',
      website: 'https://janesmith.com',
      address: '',
    },
  },
];
