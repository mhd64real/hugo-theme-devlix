# Devlix

A small, hand-built Hugo theme for a personal site with a blog. It is deliberately minimal: plain HTML, one CSS file, one tiny JS file, and a few opinionated touches (an ASCII-art post header, a terminal-style empty state, CSS-only dark mode).

The site works fully without JavaScript. JS only enhances two details (clickable email, local-time stamp).

## Features

- Home page with a profile card (photo, name, roles, contact links)
- Blog with a paginated card grid, RSS feed, empty state, and end-of-feed marker
- Posts with an ASCII-art header, reading time, cover image, and prev/next navigation
- Clean generic template for any other page (About, Now, etc.)
- CSS-only dark mode that follows the visitor's system setting
- `figure` and `terminal` shortcodes
- Scrape-resistant email that still works without JS
- Footer with the exact build time, shown in the visitor's local timezone
- No `<h1>` anywhere: `h2` is the largest heading site-wide (enforced by a render hook)

## Requirements

- Hugo extended, version 0.116.0 or newer

## Install

From your site's root:

```sh
git submodule add https://github.com/<you>/devlix themes/devlix
```

Or clone it into `themes/devlix` directly. Then set the theme in your config:

```toml
theme = 'devlix'
```

A complete starting config lives in `exampleSite/config.toml`.

## Configuration

All settings go in your site config (`hugo.toml`). The theme ships sensible defaults, so you only set what you want to change.

```toml
baseURL  = 'https://example.com/'
title    = 'mhd64'
theme    = 'devlix'
uglyURLs = true            # posts become /blog/post.html; sections stay /blog/

[outputs]
  home    = ['html', 'rss']
  section = ['html', 'rss']

[params]
  description  = 'A short site description.'
  footerText   = 'Your line above the credit.'   # optional, allows HTML (e.g. links)
  postsPerPage = 18          # blog cards per page
  readingSpeed = 200         # words-per-minute for reading time
  asciiArtSize = '0.6rem'    # font size of the ASCII art on post pages

  [params.profile]
    name  = 'Your Name'
    photo = '/img/profile.jpg'   # local path or a full https URL
    roles = ['Your role', 'Another line']
    email = 'you@example.com'    # rendered scrape-resistant

    [[params.profile.links]]
      text = 'github/you'
      url  = 'https://github.com/you'

[menu]
  [[menu.main]]
    name = 'Home'
    url  = '/index.html'
    weight = 10
  [[menu.main]]
    name = 'Blog'
    url  = '/blog/'
    weight = 20

[markup]
  [markup.highlight]
    style     = 'monokai'
    noClasses = true
  [markup.goldmark.renderer]
    unsafe = true            # allows raw HTML (and <small>) in markdown
```

### Settings reference

| Setting | Default | What it does |
|---|---|---|
| `params.footerText` | (unset) | Custom line shown above the footer credit (HTML allowed) |
| `params.profile.name` | (unset) | Name shown on the home card |
| `params.profile.photo` | (unset) | Profile photo, local path or URL |
| `params.profile.roles` | (unset) | Lines shown under the name |
| `params.profile.email` | (unset) | Contact email, obfuscated |
| `params.profile.links` | (unset) | List of `{text, url}` links |
| `params.postsPerPage` | `18` | Blog posts per page |
| `params.readingSpeed` | `200` | Words per minute for reading time |
| `params.asciiArtSize` | `0.6rem` | ASCII art font size on posts |

Any profile field you leave out is simply not rendered.

## Content structure

```
content/
  _index.md            # home page (your intro)
  blog/
    _index.md          # blog landing (title + intro line)
    my-first-post.md   # a post
data/
  ascii.txt            # ASCII art shown on post pages
static/
  img/                 # your images (profile photo, post covers)
```

### Home (`content/_index.md`)

The body markdown is your intro. Example:

```markdown
---
title: "Home"
---

# Hi, I'm You

A sentence or two about yourself.
```

### Blog landing (`content/blog/_index.md`)

```markdown
---
title: "Blog Articles"   # heading shown on the page
linkTitle: "Blog"        # shorter name used in the browser tab
---

A line of intro text under the heading.
```

### A post (`content/blog/<name>.md`)

```markdown
---
title: "My First Post"
date: 2026-06-19
draft: false
image: "/img/cover.jpg"   # optional: card thumbnail + cover, local path or URL
---

Your content...
```

- Set `draft: false` (or run `hugo server -D`) to see drafts.
- `image` is optional. Without it, the card and post show no cover.
- Dates display as `DD/MM/YYYY`.

### ASCII art (`data/ascii.txt`)

The post pages show an ASCII-art header. Paste your art into `data/ascii.txt`. It is read raw and escaped, so characters like `<`, `>`, `|`, `\` render literally. Size it with `params.asciiArtSize`.

## Shortcodes

### `figure`

A centered image with an optional caption.

```markdown
{{< figure src="/img/photo.jpg" caption="A caption." alt="Alt text" width="60%" >}}
```

- `src` (required): local path or full URL
- `caption`, `alt`, `width` (optional)

### `terminal`

A terminal-style box. Your lines become the content; a blinking `$ █` prompt is added at the end.

```markdown
{{< terminal >}}
$ whoami
Your Name
{{< /terminal >}}
```

Use it on the home page or any page. It does not appear unless you add it.

## Images in content

Any image inside post content never crops. It scales down proportionally to fit (max width 100%, max height 350px), sits centered, and gets a thin border that matches the theme.

## Headings

The site never emits an `<h1>`. A render hook promotes any markdown `#` to `<h2>`, and `h2` is the largest heading. So `#` and `##` both render at the top size, and deeper levels step down.

## Dark mode

Dark mode is CSS-only and follows the visitor's operating-system or browser setting (`prefers-color-scheme`). There is no toggle and no JavaScript. All colors come from CSS variables in `static/css/style.css`, so a palette change is a few edits in one place.

## JavaScript

There is one small file, `static/js/devlix.js`, with two progressive enhancements:

1. Reassembles the obfuscated email into a clickable `mailto:` link.
2. Converts the footer's build time from UTC to the visitor's local time.

With JavaScript off, the email is still readable (`you [at] example.com`) and the time still shows in UTC. Nothing about content or navigation depends on JS.

## URLs

With `uglyURLs = true`, posts render as `/blog/post-name.html` while sections stay as directories (`/blog/`, `/`). Menu entries should match: use `/index.html` for home, `/blog/` for the blog section, and `/page.html` for standalone pages.

## License

MIT.
