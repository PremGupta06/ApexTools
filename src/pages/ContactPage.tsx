import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <ToolLayout title="Contact Us">

      <div className="space-y-5 max-w-md mx-auto bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">

        <Input
          placeholder="Your Name"
          className="bg-black/40 border-white/10 text-white"
        />

        <Input
          placeholder="Your Email"
          className="bg-black/40 border-white/10 text-white"
        />

        <Textarea
          placeholder="Your Message..."
          rows={5}
          className="bg-black/40 border-white/10 text-white"
        />

        <Button className="w-full btn-f1 font-semibold">
          Send Message
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          support@apextools.com
        </p>

      </div>

    </ToolLayout>
  );
};

export default Contact;