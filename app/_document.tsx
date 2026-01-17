import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Meta tag de verificación de Google */}
        <meta
          name="google-site-verification"
          content="8Q_S8I2dt_IDb1Z40YjwGCuEjHqR0w1zBOS4hq4pGFA"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
