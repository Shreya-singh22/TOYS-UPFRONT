import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-12 lg:py-16 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-card mb-2">
            Get Toy Deals & Parenting Tips
          </h2>
          <p className="font-body text-card/60 mb-8">Subscribe and get 10% off your first order.</p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl font-body text-sm bg-card/10 text-card placeholder:text-card/40 border border-card/20 focus:outline-none focus:border-card/40"
            />
            <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
