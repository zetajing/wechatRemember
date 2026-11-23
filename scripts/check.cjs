const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const root = path.resolve(__dirname, '..')
const config = JSON.parse(fs.readFileSync(path.join(root, 'project.config.json')))
assert.equal(config.compileType, 'miniprogram')
const source = path.join(root, config.miniprogramRoot)
function checkTree(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) checkTree(file)
    else if (file.endsWith('.json')) JSON.parse(fs.readFileSync(file, 'utf8'))
    else if (file.endsWith('.js')) execFileSync(process.execPath, ['--check', file])
  }
}
checkTree(source)
const app = JSON.parse(fs.readFileSync(path.join(source, 'app.json')))
assert.ok(app.pages.length > 0)
for (const page of app.pages) {
  for (const ext of ['.js', '.json', '.wxml', '.wxss']) {
    assert.ok(fs.statSync(path.join(source, page + ext)).isFile())
  }
}
assert.ok(fs.statSync(path.join(source, app.sitemapLocation)).isFile())
const example = 'pages/index/index'
if (app.pages.includes(example)) {
  let page
  global.Page = definition => {
    page = { ...definition, setData(update) { Object.assign(this.data, update) } }
  }
  require(path.join(source, example + '.js'))
  const markup = fs.readFileSync(path.join(source, example + '.wxml'), 'utf8')
  for (const [, handler] of markup.matchAll(/bindtap="(\w+)"/g)) {
    assert.equal(typeof page[handler], 'function', handler)
  }
  assert.equal(page.data.count, 0)
  page.increment()
  page.increment()
  assert.equal(page.data.count, 2)
  page.reset()
  assert.equal(page.data.count, 0)
}
console.log('OK: config, registered pages, JavaScript syntax and demo interactions')
