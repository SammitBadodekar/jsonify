import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/ui/header";
import {
  ArrowRight,
  Globe,
  Code,
  Zap,
  Github,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-background text-foreground py-20 h-[calc(100vh_-_80px)] flex flex-col justify-center px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Transform Any Data or Website into Structured JSON
          </h1>
          <p className="text-xl mb-4">
            Simplify your data processing with our powerful JSON conversion tool
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/SammitBadodekar/jsonify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                Star us on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* See the Magic in Action Section */}
      <section className="py-20 bg-muted px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            See the Magic in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Raw Data</h3>
              <pre className="bg-background p-4 rounded-md overflow-x-auto">
                <code>{`Name: John Doe
Age: 30
City: New York
Hobbies: reading, cycling, photography
Email: john@example.com
`}</code>
              </pre>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Structured JSON</h3>
              <pre className="bg-background p-4 rounded-md overflow-x-auto">
                <code>{`{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": [
    "reading",
    "cycling",
    "photography"
  ],
  "email": "john@example.com"
}`}</code>
              </pre>
            </Card>
          </div>
        </div>
      </section>

      {/* Website to JSON Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            From Websites to JSON in Seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Scrape Any Public Website
              </h3>
              <p className="text-muted-foreground">
                Our advanced scraping technology can extract data from any
                public website, turning complex web pages into structured data.
              </p>
            </Card>
            <Card className="p-6">
              <Code className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Intelligent Data Parsing
              </h3>
              <p className="text-muted-foreground">
                Our AI-powered algorithms intelligently parse website content,
                identifying key data points and organizing them into a logical
                structure.
              </p>
            </Card>
            <Card className="p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Instant JSON Conversion
              </h3>
              <p className="text-muted-foreground">
                Get your scraped data in clean, structured JSON format
                instantly. Ready for integration with your applications or
                further analysis.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About Us</h3>
              <p className="text-gray-300">
                {`We're passionate about making data processing and web scraping
                accessible to everyone. Our open-source tool is designed to
                simplify your workflow and boost productivity.`}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Open Source</h3>
              <p className="text-gray-300">
                Our project is open-source and available on GitHub. We welcome
                contributions from the community!
              </p>
              <Button
                asChild
                className="bg-primary-foreground hover:bg-primary-foreground/90 text-black hover:text-white"
              >
                <Link
                  href="https://github.com/SammitBadodekar/jsonify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:underline"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Star us on GitHub
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="mailto:contact@example.com"
                    className="inline-flex items-center text-white hover:underline"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    badodekarsammit@gmail.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/sammitbadodekar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:underline"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    @SammitBadodekar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
