# Scaffolding blocks

It is also possible to generate PHP, JS and CSS code for registering a Gutenberg block for a plugin or theme.

## Installing WP-CLI

Before installing `WP-CLI`, please make sure your environment meets the minimum requirements:

* UNIX-like environment (OS X, Linux, FreeBSD, Cygwin); limited support in Windows environment
* PHP 5.3.29 or later
* WordPress 3.7 or later

Once you’ve verified requirements, you should follow the [installation instructions](http://wp-cli.org/#installing). Downloading the Phar file is the recommended installation method for most users. Should you need, see also the documentation on [alternative installation methods](https://make.wordpress.org/cli/handbook/installing/).

_Important_: To use scaffolding command for blocks you temporary need to run `wp cli update --nightly` to use the latest nightly build of WP-CLI. The nightly build is more or less stable enough for you to use in your development environment, and always includes the latest and greatest WP-CLI features.

## Using `wp scaffold block`

```bash
wp scaffold block <slug> [--title=<title>] [--dashicon=<dashicon>] [--category=<category>] [--theme] [--plugin=<plugin>] [--force]
```

Please refer to the [command documentation](https://github.com/wp-cli/scaffold-command#wp-scaffold-block) to learn more about the block subcommand options.

When you scaffold a block you must provide at least a `slug` name and either the `theme` or `plugin` name. We strongly recommended using blocks with plugins rather than themes.

### Examples

```bash
# Generate a 'movie' block for the 'movies' plugin
$ wp scaffold block movie --title="Movie block" --plugin=movies
Success: Created block 'Movie block'.

# Generate a 'movie' block for the 'simple-life' theme
$ wp scaffold block movie --title="Movie block" --theme=simple-life
 Success: Created block 'Movie block'.

# Create a new plugin and add two blocks
# Create plugin called books
$ wp scaffold plugin books
# Add a block called book to plugin books
$ wp scaffold block book --title="Book" --plugin=books
# Add a second block to plugin called books.
$ wp scaffold block books --title="Book List" --plugin=books
```
