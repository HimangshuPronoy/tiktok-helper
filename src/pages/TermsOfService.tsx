
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <Card className="bg-black/30 border-white/10 backdrop-blur-lg p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gradient mb-2">Terms of Service</h1>
            <p className="text-white/70">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mt-4">1. Ownership and Intellectual Property</h2>
            <p>
              TikTokHelper is a proprietary application owned exclusively by TikTokHelper Inc. All content, features, and intellectual property within this application, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of TikTokHelper Inc. and are protected by international copyright, trademark, and intellectual property laws.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">2. Prohibited Activities</h2>
            <p>
              Users are strictly prohibited from copying, duplicating, reverse-engineering, or creating derivative works based on the TikTokHelper application or any part thereof. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Creating a similar application with comparable features</li>
              <li>Replicating the user interface design</li>
              <li>Duplicating the business model</li>
              <li>Extracting or copying any data, algorithms, or functionality</li>
              <li>Reproducing the workflow or unique features of the application</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6">3. Legal Consequences</h2>
            <p>
              Any unauthorized reproduction, distribution, or creation of similar applications will constitute a violation of this agreement and may result in severe legal consequences, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Injunctive relief</li>
              <li>Monetary damages in the amount of millions of dollars</li>
              <li>Legal fees and court costs</li>
              <li>Statutory damages for copyright infringement</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6">4. User Agreement</h2>
            <p>
              By creating an account and using TikTokHelper, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Your continued use of the application constitutes your ongoing agreement to these terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">5. Modifications to Terms</h2>
            <p>
              TikTokHelper Inc. reserves the right to modify these Terms of Service at any time without prior notice. It is your responsibility to review these Terms periodically for changes. Your continued use of the application following the posting of changes constitutes your acceptance of such changes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">6. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and disclose information about you. By using TikTokHelper, you consent to the collection, use, and disclosure of information as described in our Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">7. Termination</h2>
            <p>
              TikTokHelper Inc. reserves the right to terminate or suspend your account and access to the application at any time, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">8. Disclaimer of Warranties</h2>
            <p>
              The application is provided "as is" without warranties of any kind, either express or implied. TikTokHelper Inc. disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">9. Limitation of Liability</h2>
            <p>
              In no event shall TikTokHelper Inc. be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the application.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within the United States for the resolution of any dispute.
            </p>
            
            <div className="bg-white/10 p-6 rounded-lg mt-8">
              <p className="font-semibold text-lg">By using TikTokHelper, you acknowledge that:</p>
              <p className="mt-2">
                You will not copy, replicate, or create a similar application to TikTokHelper.
                You understand that violation of these terms may result in legal action seeking monetary damages in excess of millions of dollars.
                You have read and agree to all the terms and conditions outlined in this agreement.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
