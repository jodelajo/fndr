export default function AgencyLogo({ agency }) {
  return (
    <div className="company-logo">
      {agency && (
        <img
          src={agency.logo_image_src}
          alt={`${agency.company_name} company logo`}
        />
      )}
    </div>
  );
}
