import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="zh-HK">
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                  var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != "dataLayer" ? "&l=" + l : "";
                  j.async = true;
                  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, "script", "dataLayer", "GTM-N6GRHZR");
                `,
            }}
          />
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-N6GRHZR"
                  height="0"
                  width="0"
                  style="display: none; visibility: hidden"
                ></iframe>
              `,
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
