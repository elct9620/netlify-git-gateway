# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def dev?
    config[:environment] == :development
  end

  def webpack_js(assets)
    return assets unless dev?
    "http://localhost:8080/javascripts/#{assets}.js"
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

activate :external_pipeline,
         name: :webpack,
         command:
         if build?
           'BUILD_PRODUCTION=1 ./node_modules/webpack/bin/webpack.js --bail -p'
         else
           'BUILD_DEVELOPMENT=1 ./node_modules/webpack-dev-server/' \
           'bin/webpack-dev-server.js --hotOnly -d --progress --color'
         end,
         source: '.tmp/dist',
         latency: 1
