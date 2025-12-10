export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert">
        <p className="mb-4">
          At FastGeo, we prioritize your privacy. This policy explains what data we collect and how we use it.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Data Collection</h2>
        <p className="mb-4">
          We collect the following anonymous data points when you run a speed test:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Approximate Location (Latitude/Longitude)</li>
          <li>Internet Service Provider (Operator) Name</li>
          <li>Download and Upload Speeds</li>
          <li>Timestamp of the test</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">What We Do NOT Collect</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>IP Addresses</li>
          <li>Device Identifiers (MAC address, IMEI, etc.)</li>
          <li>Browser History or Cookies (other than functional local storage)</li>
          <li>Personal Identifiable Information (Name, Email, Phone)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">Data Usage</h2>
        <p className="mb-4">
          The collected data is used solely to generate the global internet speed heatmap. 
          This aggregate data helps users understand internet connectivity quality in different regions.
        </p>
      </div>
    </div>
  );
}
