---
title: "Writing Content"
date: 2026-06-17
draft: false
description: "Pages, posts, front matter, the ASCII header, images, and the figure and terminal shortcodes."
image: "https://picsum.photos/seed/devlix-writing/600/350"
---

How content maps to pages, and the few extras Devlix gives you.

## Pages and posts

```
content/
  _index.md          # the home page (your intro)
  blog/
    _index.md        # the blog landing
    a-post.md        # a post
  about.md           # any standalone page
```

A post's front matter:

```markdown
---
title: "My Post"
date: 2026-06-19
draft: false
description: "Shown in search results and link previews."
image: "/img/cover.jpg"   # optional card + cover image
---
```

Headings note: the largest heading is `h2`. Write `#` or `##` and both render at the top size; deeper levels step down. The site never emits an `h1`.

## The ASCII header

Post pages show an ASCII-art header. Paste your art into `data/ascii.txt`; it renders as-is. Size it with `asciiArtSize`.

## Images

Any image in a post never crops. It scales to fit, centered, with a thin border:

![A landscape](https://picsum.photos/seed/devlix-img/1000/500)

## The figure shortcode

For a centered image with a caption, one line:

```text
{{</* figure src="/img/photo.jpg" caption="A caption." alt="Alt text" width="60%" */>}}
```

Which renders:

{{< figure src="https://picsum.photos/seed/devlix-fig/700/400" caption="A captioned figure, centered with a thin border." alt="Example" width="70%" >}}

## The terminal shortcode

Drop a terminal block anywhere. Your lines become the content, and a blinking `$` prompt is appended. Leave a blank line before the closing tag if you want a gap before that prompt:

```text
{{</* terminal */>}}
$ hugo new blog/hello.md
$ hugo server -D
{{</* /terminal */>}}
```

Renders as:

{{< terminal >}}
$ hugo new blog/hello.md
$ hugo server -D
{{< /terminal >}}

## Small print

Raw HTML works in markdown, so small print is just <small>a `<small>` tag</small>.
