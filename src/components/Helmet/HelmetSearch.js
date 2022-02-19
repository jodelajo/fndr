import { Helmet } from "react-helmet-async";

export default function HelmetSearch({
  titleContent,
  descriptionContent,
  URLContent,
}) {
  return (
    <Helmet>
      <title>"FNDR - Vind je digital agency in de FNDR-app"</title>
      <meta
        name="description"
        content="Vind een digital agency in FNDR, zoek op locatie en aantal medewerkers."
      />
      <meta name="og:description" content={descriptionContent} />
      <meta property="og:title" content={titleContent} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="../../../public/fndr_image.png" />
      <meta property="og:url" content={URLContent} />
      <link rel="canonical" href="https://fndr.netlify.app/" />
    </Helmet>
  );
}
