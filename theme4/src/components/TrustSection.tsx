import { motion } from "framer-motion";
import { Truck, Shield, Star, RotateCcw } from "lucide-react";

const features = [
  { icon: <Star className="h-7 w-7" />, title: "4.9 Parent Rating", desc: "Trusted by thousands of families", color: "text-sunshine" },
  { icon: <Truck className="h-7 w-7" />, title: "Free Shipping", desc: "On all orders over ₹999", color: "text-sky" },

  { icon: <Shield className="h-7 w-7" />, title: "Safe & Non-Toxic", desc: "Certified safe materials", color: "text-mint" },
  { icon: <RotateCcw className="h-7 w-7" />, title: "Easy Returns", desc: "30-day hassle-free returns", color: "text-coral" },
];

export default function TrustSection() {
  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-background"
            >
              <div className={`inline-flex mb-3 ${f.color}`}>{f.icon}</div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">{f.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
