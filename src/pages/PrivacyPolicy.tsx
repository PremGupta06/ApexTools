import ToolLayout from "@/components/ToolLayout";

const Privacy = () => {
  return (
    <ToolLayout title="Privacy Policy">

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">

        <p>
          At ApexTools, your privacy is important to us. We do not collect personal data unless you provide it voluntarily.
        </p>

        <div>
          <h3 className="text-white font-semibold mb-1">Information Collection</h3>
          <p>
            We collect non-personal information such as browser type and usage patterns to improve performance.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-1">Cookies</h3>
          <p>
            Cookies may be used to enhance user experience and analyze traffic.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-1">Third-Party Services</h3>
          <p>
            Google AdSense and analytics tools may use cookies to serve ads.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-1">Consent</h3>
          <p>
            By using this website, you agree to our privacy policy.
          </p>
        </div>

      </div>

    </ToolLayout>
  );
};

export default Privacy;