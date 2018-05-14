# Node-menu  [![Build Status](https://travis-ci.org/zimmo-be/node-menu.svg?branch=master)](https://travis-ci.org/zimmo-be/express-openapi-router) [![codecov](https://codecov.io/gh/zimmo-be/express-openapi-router/badge.svg?branch=master)](https://codecov.io/gh/zimmo-be/node-menu?branch=master)

This library objectifies HTML navigation trees (aka menus). It helps you
with building, rendering and detecting the current and/or ancestor states.

Although this is not intended to be a real port, this library is greatly
inspired by [KnpMenu](https://github.com/KnpLabs/KnpMenu/) written in PHP.

* [Getting started](#getting-started)
* [Matchers and voters](#matcher-and-voters)

## Getting started

Make sure you have installed the Core package:

```
npm install @node-menu/core
```

After installation, you should start by defining a menu:

```javascript
const { Menu, MenuItem } = require("@node-menu/core")

const topMenu = new Menu("topMenu", {
    children: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Our team",
            href: "/team",
            children: [
                {
                    label: "Sales team",
                    href: "/team/sales",
                }
            ]
        },
        {
            label: "Services",
            href: "/services",
        }
    ]
});

// You can also add menu's by calling Menu::addChild
topMenu.addChild("Contact us", {
    href: "/contact"
});

// Or, create your MenuItem instance yourself
const jobsMenu = new MenuItem("Jobs", { href: "/jobs" });
topMenu.addChild(jobsMenu);

// This works in an infinite number of levels
const applyMenu = jobsMenu.addChild("Apply now", { href: "/jobs/application" });
```

Note: The root node of your menu is an instance of `Menu`,
children and other decendants are instances of `MenuItem`.

## Matcher and Voters

The `Matcher` service will help you identify which menu items should have
the *Current* or *Ancestor* state. *Ancestor* means one of its children
 is *Current* or an *Ancestor*. For example, on the `/team/sales` page:

```
  - Home
  - Our Team (ancestor)
    - Sales (current)
  - Contact
  - Jobs
    - Apply now
```

The `Matcher` will make use of a collection of so-called `voters`. These
are functions that decide if a given item is marked as current or not.

The *Core* package currently includes 1 voter calls `UriVoter` that makes 
the decision based on the given URL.

```
const { Matcher, UriVoter } = require("@node-menu/core");

const uriVoter = new UriVoter("/team/sales");
const matcher = new Matcher([uriVoter]);

console.log(matcher.isCurrent(salesMenu); // true
console.log(matcher.isCurrent(ourTeamMenu); // false
console.log(matcher.isAncestor(ourTeamMenu); // true
```

### Custom voters

You can add your own voters by simply defining a function that will be
called with a given `MenuItem`:

```
const selectedItemVoter = (item) => item === ourTeamMenu;

const matcher = new Matcher([selectedItemVoter]);

console.log(matcher.isCurrent(ourTeamMenu); // true
```

