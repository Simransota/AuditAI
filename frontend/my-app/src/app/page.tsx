import { Hero } from "@/components/hero";
import { NavbarDemo } from "@/components/navbar";
import Image from "next/image";
import { AnimatedGradientDemo } from "../components/AnimatedGradientDemo";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { TabsDemo } from "@/components/preview";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDemo />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-5xl font-bold text-center mb-16">How It Works</h2>
          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
          Our AI-powered platform identifies hidden inconsistencies, unauthorized overrides, and risk patterns in structured sales data using Retrieval-Augmented Generation (RAG). Stay compliant and ahead of fraud.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <DatabaseWithRestApi />
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-white/50 backdrop-blur-sm">
                <div className="text-2xl">🗂️</div>
                <div>
                  <h3 className="font-semibold mb-1">Upload your sales data</h3>
                  <p className="text-muted-foreground">
                    Securely upload your sales data through our intuitive interface.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border bg-white/50 backdrop-blur-sm">
                <div className="text-2xl">🧠</div>
                <div>
                  <h3 className="font-semibold mb-1">AI analyzes & detects anomalies</h3>
                  <p className="text-muted-foreground">
                    Our AI system processes your data to identify patterns and flag potential issues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border bg-white/50 backdrop-blur-sm">
                <div className="text-2xl">🕵️</div>
                <div>
                  <h3 className="font-semibold mb-1">Investigate & resolve issues</h3>
                  <p className="text-muted-foreground">
                    Access your personalized dashboard to investigate and resolve identified issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-5xl font-bold text-center mb-16">See What We Catch</h2>
          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
          Here’s a quick look at anomalies our engine flags. From suspicious discounts to irregular SKU patterns — we help you spot issues early.
          </p>
          <TabsDemo/>
        </div>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-5xl font-bold text-center mb-16">How Our Product Helps</h2>
          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
          We eliminate guesswork with AI-driven precision.
Your sales data becomes a source of strategic insight.
          </p>
          <AnimatedGradientDemo />
        </div>
        
      </main>
      <footer className="w-full bg-white text-black py-8 px-4 mt-12">
      

      {/* Optional: Social Icons */}
      <div className="mt-6 flex justify-center gap-4">
      <p>Built with ❤️ by <span className="font-semibold">The Horcruxes</span></p>
      <p>Powered by:</p>
      <p className="text-black-300">Next.js · Python · LangChain · Tailwind · Hugging Face</p>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub className="h-5 w-5 hover:text-blue-400" />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="h-5 w-5 hover:text-blue-400" />
        </a>
      </div>
    </footer>

    </div>
  );
}