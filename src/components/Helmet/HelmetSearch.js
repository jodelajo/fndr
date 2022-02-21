import { Helmet } from "react-helmet-async";

export default function HelmetSearch({
  titleContent,
  descriptionContent,
  URLContent,
}) {
  return (
    <Helmet>
      <title>FNDR - Find your Dutch digital agency on FNDR</title>
      <meta
        name="description"
        content="Find a Dutch digital agency in the FNDR-app, filter on location and company size."
      />
      <meta name="og:description" content={descriptionContent} />
      <meta property="og:title" content={titleContent} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="./fndr_image.png" />
      <meta property="og:url" content={URLContent} />
      <link rel="canonical" href="https://fndr.netlify.app/" />
    </Helmet>
  );
}
