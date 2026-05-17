import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { DemoPreview } from "@/components/sections/DemoPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import Chatbot from "@/components/Chatbot";



export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Features />
            <DemoPreview />
            <Testimonials />
            <Chatbot />
        </div>
    );
}
