export default function (html, preloadedState) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
     <title>ssr initialised</title>
    </head>
    <Body>
        <div id='root'}>${html}</div>
        <script>
        window.__PRELOADED__STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/bundle.js"}></script>
    </Body>
    </html>
    `
}