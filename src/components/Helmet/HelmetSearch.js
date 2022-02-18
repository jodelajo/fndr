import { Helmet } from "react-helmet-async";

export default function HelmetSearch({
  title,
  titleContent,
  descriptionContent,
  URLContent,
  imageContent,
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content="Vind een digital agency in FNDR, zoek op locatie en grootte"
      />
      <meta name="og:description" content={descriptionContent} />
      <meta property="og:title" content={titleContent} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageContent} />
      <meta property="og:url" content={URLContent} />
      <link rel="canonical" href="https://fndr.netlify.app/" />
    </Helmet>
  );
}
