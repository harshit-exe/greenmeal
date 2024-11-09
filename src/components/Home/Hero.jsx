import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, BarChart, Heart } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-background py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                Track Your Meals, Achieve Your Goalss
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                GreenMeal helps you monitor your food intake, set nutritional
                goals, and make healthier choices.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose GreenMeal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Utensils className="h-10 w-10" />}
                title="Easy Meal Logging"
                description="Quickly log your meals with our intuitive interface and extensive food database."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10" />}
                title="Detailed Analytics"
                description="Get insights into your eating habits with comprehensive charts and reports."
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10" />}
                title="Personalized Goals"
                description="Set and track custom nutritional goals tailored to your specific needs."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 GreenMeal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
