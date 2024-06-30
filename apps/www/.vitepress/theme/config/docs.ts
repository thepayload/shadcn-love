export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  items?: NavItem[]
  description?: string
}

export type SidebarNavItem = NavItem & {
  items?: SidebarNavItem[]
}

export type NavItemWithChildren = NavItem & {
  items?: NavItemWithChildren[]
}

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Docs',
      href: '/docs/introduction',
    },
    {
      title: 'Components',
      href: '/docs/components/accordion',
    },
    {
      title: 'Themes',
      href: '/themes',
    },
    {
      title: 'Examples',
      href: '/examples/mail',
    },
    {
      title: 'Blocks',
      href: '/blocks',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/radix-vue/shadcn-vue',
      external: true,
    },
    {
      title: 'Pro',
      label: 'New',
      items: [
        {
          title: 'Blocks',
          href: '/pro/blocks',
          description: 'Pre-built components, including authentication, navigation, and more.',
        },
        {
          title: 'Products',
          href: '/pro/products',
          description: 'Some examples of products like e-commerce, CRM, and more. Built with Shadcn Vue.',
        },
        {
          title: 'Themes',
          href: '/pro/themes',
          description: 'Some pre-built themes configured with Shadcn Vue. Including spacing, colors, and more.',
        },
      ],
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
        },
        {
          title: 'Installation',
          href: '/docs/installation',
        },
        {
          title: 'components.json',
          href: '/docs/components-json',
        },
        {
          title: 'Theming',
          href: '/docs/theming',
        },
        {
          title: 'Dark Mode',
          href: '/docs/dark-mode',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
        },
        {
          title: 'Typography',
          href: '/docs/typography',
        },
        {
          title: 'Figma',
          href: '/docs/figma',
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
        },
        {
          title: 'About',
          href: '/docs/about',
        },
        {
          title: 'Contribution',
          href: '/docs/contribution',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'Vite',
          href: '/docs/installation/vite',
        },
        {
          title: 'Nuxt',
          href: '/docs/installation/nuxt',
        },
        {
          title: 'Astro',
          href: '/docs/installation/astro',
        },
        {
          title: 'Laravel',
          href: '/docs/installation/laravel',
        },
      ],
    },
    {
      title: 'Extended',
      items: [
        {
          title: 'Auto Form',
          href: '/docs/components/auto-form',
          items: [],
          label: 'New',
        },
        {
          title: 'Charts',
          href: '/docs/charts',
          label: 'New Alpha',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Accordion',
          href: '/docs/components/accordion',
        },
        {
          title: 'Alert',
          href: '/docs/components/alert',
        },
        {
          title: 'Alert Dialog',
          href: '/docs/components/alert-dialog',
        },
        {
          title: 'Aspect Ratio',
          href: '/docs/components/aspect-ratio',
        },
        {
          title: 'Avatar',
          href: '/docs/components/avatar',
        },
        {
          title: 'Badge',
          href: '/docs/components/badge',
        },
        {
          title: 'Breadcrumb',
          href: '/docs/components/breadcrumb',
          items: [],
        },
        {
          title: 'Button',
          href: '/docs/components/button',
        },
        {
          title: 'Calendar',
          href: '/docs/components/calendar',
          items: [],
          label: 'Updated',
        },
        {
          title: 'Card',
          href: '/docs/components/card',
        },
        {
          title: 'Carousel',
          href: '/docs/components/carousel',
          items: [],
        },
        {
          title: 'Checkbox',
          href: '/docs/components/checkbox',
        },
        {
          title: 'Collapsible',
          href: '/docs/components/collapsible',
        },
        {
          title: 'Combobox',
          href: '/docs/components/combobox',
        },
        {
          title: 'Command',
          href: '/docs/components/command',
        },
        {
          title: 'Context Menu',
          href: '/docs/components/context-menu',
        },
        {
          title: 'Data Table',
          href: '/docs/components/data-table',
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker',
          items: [],
          label: 'Updated',
        },
        {
          title: 'Dialog',
          href: '/docs/components/dialog',
        },
        {
          title: 'Drawer',
          href: '/docs/components/drawer',
          items: [],
        },
        {
          title: 'Dropdown Menu',
          href: '/docs/components/dropdown-menu',
        },
        {
          title: 'Form',
          href: '/docs/components/form',
        },
        {
          title: 'Hover Card',
          href: '/docs/components/hover-card',
        },
        {
          title: 'Input',
          href: '/docs/components/input',
        },
        {
          title: 'Label',
          href: '/docs/components/label',
        },
        {
          title: 'Menubar',
          href: '/docs/components/menubar',
        },
        {
          title: 'Navigation Menu',
          href: '/docs/components/navigation-menu',
        },
        {
          title: 'Number Field',
          href: '/docs/components/number-field',
          label: 'New Alpha',
        },
        {
          title: 'Pagination',
          href: '/docs/components/pagination',
        },
        {
          title: 'PIN Input',
          href: '/docs/components/pin-input',
          items: [],
        },
        {
          title: 'Popover',
          href: '/docs/components/popover',
        },
        {
          title: 'Progress',
          href: '/docs/components/progress',
        },
        {
          title: 'Radio Group',
          href: '/docs/components/radio-group',
        },
        {
          title: 'Range Calendar',
          href: '/docs/components/range-calendar',
          items: [],
        },
        {
          title: 'Resizable',
          href: '/docs/components/resizable',
          items: [],
        },
        {
          title: 'Scroll Area',
          href: '/docs/components/scroll-area',
        },
        {
          title: 'Select',
          href: '/docs/components/select',
        },
        {
          title: 'Separator',
          href: '/docs/components/separator',
          label: 'Updated',
        },
        {
          title: 'Sheet',
          href: '/docs/components/sheet',
        },
        {
          title: 'Skeleton',
          href: '/docs/components/skeleton',
        },
        {
          title: 'Slider',
          href: '/docs/components/slider',
        },
        {
          title: 'Sonner',
          href: '/docs/components/sonner',
          items: [],
        },
        {
          title: 'Switch',
          href: '/docs/components/switch',
        },
        {
          title: 'Table',
          href: '/docs/components/table',
        },
        {
          title: 'Tabs',
          href: '/docs/components/tabs',
        },
        {
          title: 'Tags Input',
          href: '/docs/components/tags-input',
          items: [],
        },
        {
          title: 'Textarea',
          href: '/docs/components/textarea',
        },
        {
          title: 'Toast',
          href: '/docs/components/toast',
        },
        {
          title: 'Toggle',
          href: '/docs/components/toggle',
        },
        {
          title: 'Toggle Group',
          href: '/docs/components/toggle-group',
        },
        {
          title: 'Tooltip',
          href: '/docs/components/tooltip',
        },
      ],
    },
    {
      title: 'Components Wrapper',
      label: 'Pro',
      items: [
        {
          title: 'Alert',
          href: '/pro/wrappers/alert',
        },
        {
          title: 'Alert Dialog',
          href: '/pro/wrappers/alert-dialog',
          disabled: true,
        },
        {
          title: 'Avatar',
          href: '/pro/wrappers/avatar',
        },
        {
          title: 'Breadcrumb',
          href: '/pro/wrappers/breadcrumb',
          disabled: true,
        },
        {
          title: 'Calendar',
          href: '/pro/wrappers/calendar',
          disabled: true,
        },
        {
          title: 'Card',
          href: '/pro/wrappers/card',
          disabled: true,
        },
        {
          title: 'Carousel',
          href: '/pro/wrappers/carousel',
          disabled: true,
        },
        {
          title: 'Checkbox',
          href: '/pro/wrappers/checkbox',
          disabled: true,
        },
        {
          title: 'Combobox',
          href: '/pro/wrappers/combobox',
          disabled: true,
        },
        {
          title: 'Command',
          href: '/pro/wrappers/command',
          disabled: true,
        },
        {
          title: 'Context Menu',
          href: '/pro/wrappers/context-menu',
          disabled: true,
        },
        {
          title: 'Data Table',
          href: '/pro/wrappers/data-table',
          disabled: true,
        },
        {
          title: 'Date Picker',
          href: '/pro/wrappers/date-picker',
          disabled: true,
        },
        {
          title: 'Dialog',
          href: '/pro/wrappers/dialog',
          disabled: true,
        },
        {
          title: 'Drawer',
          href: '/pro/wrappers/drawer',
          disabled: true,
        },
        {
          title: 'Dropdown Menu',
          href: '/pro/wrappers/dropdown-menu',
          disabled: true,
        },
        {
          title: 'Form',
          href: '/pro/wrappers/form',
          disabled: true,
        },
        {
          title: 'Input',
          href: '/pro/wrappers/input',
          disabled: true,
        },
        {
          title: 'Menubar',
          href: '/pro/wrappers/menubar',
          disabled: true,
        },
        {
          title: 'Number Field',
          href: '/pro/wrappers/number-field',
          disabled: true,
        },
        {
          title: 'Pagination',
          href: '/pro/wrappers/pagination',
          disabled: true,
        },
        {
          title: 'Pin Input',
          href: '/pro/wrappers/pin-input',
          disabled: true,
        },
        {
          title: 'Radio Group',
          href: '/pro/wrappers/radio-group',
          disabled: true,
        },
        {
          title: 'Range Calendar',
          href: '/pro/wrappers/range-calendar',
          disabled: true,
        },
        {
          title: 'Select',
          href: '/pro/wrappers/select',
          disabled: true,
        },
        {
          title: 'Sheet',
          href: '/pro/wrappers/sheet',
          disabled: true,
        },
        {
          title: 'Sekelton',
          href: '/pro/wrappers/skeleton',
          disabled: true,
        },
        {
          title: 'Slider',
          href: '/pro/wrappers/slider',
          disabled: true,
        },
        {
          title: 'Switch',
          href: '/pro/wrappers/switch',
          disabled: true,
        },
        {
          title: 'Table',
          href: '/pro/wrappers/table',
          disabled: true,
        },
        {
          title: 'Tabs',
          href: '/pro/wrappers/tabs',
          disabled: true,
        },
        {
          title: 'Tags Input',
          href: '/pro/wrappers/tags-input',
          disabled: true,
        },
        {
          title: 'Textarea',
          href: '/pro/wrappers/textarea',
          disabled: true,
        },
        {
          title: 'Toggle',
          href: '/pro/wrappers/toogle',
          disabled: true,
        },
        {
          title: 'Toggle Group',
          href: '/pro/wrappers/toggle-group',
          disabled: true,
        },
        {
          title: 'Tooltip',
          href: '/pro/wrappers/tootip',
          disabled: true,
        },
      ],
    },
    {
      title: 'Blocks',
      label: 'Pro',
      items: [
        {
          title: 'Login',
          href: '/pro/blocks/login',
        },
        {
          title: 'Register',
          href: '/pro/blocks/register',
        },
        {
          title: 'Sidebar',
          href: '/pro/blocks/sidebar',
        },
        {
          title: 'Navbar',
          href: '/pro/blocks/navbar',
        },
        {
          title: 'Widget',
          href: '/pro/blocks/widget',
        },
      ],
    },
  ],
}

interface Example {
  name: string
  href: string
  label?: string
  code: string
}
export const examples: Example[] = [
  {
    name: 'Mail',
    href: '/examples/mail',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/mail',
  },
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  // {
  // name: "Tasks",
  // href: "/examples/tasks",
  // label: "New",
  // code: "https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/tasks"
  // },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/routes/examples/forms',
  },
]
