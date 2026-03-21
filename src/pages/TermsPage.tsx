import ToolLayout from "@/components/ToolLayout";

const Terms = () => {
  return (
    <ToolLayout title="Terms & Conditions">

      <div className="space-y-6 text-sm text-muted-foreground bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">

        <p>
          By using ApexTools, you agree to our terms and conditions.
        </p>

        <div>
          <h3 className="text-white font-semibold">Usage</h3>
          <p>Tools are provided for educational purposes only.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold">Accuracy</h3>
          <p>We do not guarantee 100% accuracy of tool outputs.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold">Updates</h3>
          <p>We may update terms anytime without prior notice.</p>
        </div>

      </div>

    </ToolLayout>
  );
};

export default Terms;