---
title: "Configuration"
date: 2026-06-18
draft: false
description: "Every Devlix setting: the profile card, blog, SEO, and theme options."
image: "https://picsum.photos/seed/devlix-config/600/350"
---

Everything lives in your site config. Devlix ships sensible defaults, so you only set what you want to change.

## Profile card

The home and blog pages show a profile card built from `[params.profile]`:

```toml
[params.profile]
  name  = 'Your Name'
  photo = '/img/me.jpg'        # local path or a full https URL
  roles = ['Role one', 'Role two']

  [[params.profile.links]]
    text = 'you@example.com'
    url  = 'mailto:you@example.com'
  [[params.profile.links]]
    text = 'github/you'
    url  = 'https://github.com/you'
```

Add a `[[params.profile.links]]` block for each link, including email (write the `mailto:` yourself). Any field you leave out is simply not rendered.

## Theme options

These sit under `[params]`:

| Setting | Default | What it does |
|---|---|---|
| `postsPerPage` | `18` | Blog posts per page |
| `readingSpeed` | `200` | Words per minute for reading time |
| `asciiArtSize` | `0.6rem` | Size of the ASCII header on posts |
| `photoRatio` | `4 / 5` | Profile photo aspect ratio (`1 / 1` for square) |
| `footerText` | (none) | A custom line above the footer credit (HTML allowed) |

## Light and dark

Devlix follows the visitor's operating-system setting by default. Two `[params]` settings control it:

| Setting | Default | What it does |
|---|---|---|
| `colorScheme` | `auto` | `auto` follows the OS; `light` or `dark` locks the whole site to one theme |
| `themeToggle` | `true` | Show the light/dark switch (◐) in the nav, only applies when `colorScheme = 'auto'` |

In `auto` mode a small toggle appears in the nav; the visitor's choice is remembered across visits, and with no JavaScript the site simply follows the OS. Setting `colorScheme` to `light` or `dark` removes the toggle and pins every visitor to that one theme. The optional guestbook tracks the same setting, live, when the toggle is flipped.

Link hovers use a color invert, that part is built in and not configurable.

## Custom cursor

For an old-web feel, Devlix can swap the pointer for a Plan 9 style arrow:

| Setting | Default | What it does |
|---|---|---|
| `customCursor` | `false` | Use the bundled arrow cursor instead of the system one |
| `cursorImage` | `/img/cursor.png` | Override the cursor image (used only when `customCursor = true`) |

## SEO

Devlix outputs canonical URLs, Open Graph, Twitter cards, JSON-LD, a sitemap, and `robots.txt` automatically. Give it the details to work with:

```toml
enableRobotsTXT = true

[params]
  description  = 'A one-line site description.'
  tagline      = 'Your Name, what you do'  # home social/share title (og:title); the browser title stays just the site name
  author       = 'Your Name'        # falls back to profile.name
  defaultImage = '/img/og.png'      # share image when a page has none
  twitter      = 'handle'           # without the @
  favicon      = '/img/icon.png'    # defaults to the profile photo
```

Per post, set a `description` and `image` in front matter for the best previews.

## Guestbook (Giscus)

Devlix ships a `giscus` shortcode for a GitHub Discussions-backed guestbook or comments. Enable Discussions on a public repo, install the [giscus app](https://github.com/apps/giscus) on it, then:

```toml
[params.giscus]
  repo          = 'you/your-repo'
  repoId        = 'R_...'        # from giscus.app
  category      = 'General'
  categoryId    = 'DIC_...'      # from giscus.app
  mapping       = 'pathname'
  discussionUrl = ''             # optional: the fallback link's target
                                 # (defaults to the repo's Discussions tab)
```

It's **opt-in**: the guestbook is just a normal content page you create, so the text is editable like any other page. Add `content/guestbook.md` with your intro and drop in the shortcode:

```markdown
---
title: "Guestbook"
---

Leave a note.

{{</* giscus */>}}
```

Add a menu entry for it if you want it in the nav. The widget matches the site's theme (and follows the toggle live) and degrades gracefully: without JavaScript (or when a privacy browser blocks its cookies) it shows a link to sign on GitHub directly.

## Menu

```toml
[menu]
  [[menu.main]]
    name = 'Home'
    url  = '/index.html'
    weight = 10
  [[menu.main]]
    name = 'Blog'
    url  = '/blog/'
    weight = 20
```

> With `uglyURLs = true`, posts are `/blog/post.html` while sections stay `/blog/`. Match your menu URLs to that.
