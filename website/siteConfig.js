/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.


const siteConfig = {
  title: '',
  tagline: 'Hyperfast data management tools to enable next-gen UX',
  url: 'https://hux-js.github.io',
  baseUrl: '/hux-dox/',

  projectName: 'hux-dox',
  organizationName: 'hux-js',

  headerLinks: [
    {doc: 'overview', label: 'Docs'},
    {doc: 'roadmap', label: 'Roadmap'},
    {blog: true, label: 'Blog'},
  ],

  headerIcon: 'img/hux-icon-white-new.svg',
  footerIcon: 'img/hux-logo-white-new.svg',
  favicon: 'img/hux-icon-white-new.svg',

  colors: {
    primaryColor: '#ed094a',
    secondaryColor: '#293238',
  },

  fonts: {
    Roboto: [
      "Roboto",
      "sans-serif"
    ],
  },

  copyright: `Copyright © ${new Date().getFullYear()} Hux JS`,

  highlight: {
    theme: 'atom-one-dark',
  },

  scripts: ['https://buttons.github.io/buttons.js'],

  onPageNav: 'separate',
  cleanUrl: true,

  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  docsSideNavCollapsible: true,

  repoUrl: 'https://github.com/hux-js/hux',

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  ],
};

module.exports = siteConfig;
