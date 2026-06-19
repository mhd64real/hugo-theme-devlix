---
title: "Getting Started"
date: 2026-06-19
draft: false
description: "Install the Devlix Hugo theme, add the minimum config, and run your site."
image: "https://picsum.photos/seed/devlix-start/600/350"
---

Devlix is a small Hugo theme for a personal site with a blog. This page gets you from nothing to a running site.

## Requirements

- Hugo **extended**, v0.116.0 or newer.

## Install

Add Devlix as a submodule of your Hugo site:

```bash
git submodule add https://github.com/mhd64real/hugo-theme-devlix themes/devlix
```

Then point your config at it:

```toml
theme = 'devlix'
```

## Minimum config

A working `hugo.toml` needs very little:

```toml
baseURL  = 'https://example.com/'
title    = 'Your Name'
theme    = 'devlix'
uglyURLs = true

[params.profile]
  name  = 'Your Name'
  photo = '/img/me.jpg'
  roles = ['What you do']
  email = 'you@example.com'
```

## Run it

```bash
hugo server -D
```

Open `http://localhost:1313`. That is the whole loop: edit, save, the browser reloads.

Next: see [Configuration](/blog/configuration.html) for every option, then [Writing Content](/blog/writing-content.html).
