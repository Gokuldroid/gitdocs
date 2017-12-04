# Sidebar Configuration

By default GitDocs will automatically generate the navigation based on your `/docs` folder structure.

## Custom

We recommend configuring the sidebar navigation in `docs.json` like so:

```json
{
  "sidebar": {
    "Introduction": "README.md",
    "Quickstart": "quickstart.md",
    "Writing": {
      "markdown": "markdown/markdown.md",
      "syntax": "syntax/code/languagues.md",
      "Components": {
        "helpers": "helpers.md",
        "custom": "components/readme.md"
      }
    }
  }
}
```

You can infinitely nest folders, although we recommend limiting this to 2 or 3 levels otherwise navigating can become tedious and it's more difficult to visualize the hierarchy.

You can also set the default depth of the navigation like so:

```json
defaultDepth: 2
```

which means that that many levels of the navigation will be expanded by default.
