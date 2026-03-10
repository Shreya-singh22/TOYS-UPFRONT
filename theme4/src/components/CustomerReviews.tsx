import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const reviews = [
  { name: "Sarah M.", text: "My kids absolutely love these toys! The quality is incredible and they're so well made.", rating: 5, detail: "Parent of 2" },
  { name: "James K.", text: "Best toy store we've found. Educational and fun — exactly what we were looking for.", rating: 5, detail: "Parent of 3" },
  { name: "Lisa T.", text: "The wooden train set is our son's favorite. Beautiful craftsmanship and safe materials.", rating: 5, detail: "Parent of 1" },
  { name: "Michael R.", text: "Fast shipping, great packaging, and the toys exceeded our expectations. Will order again!", rating: 4, detail: "Grandparent" },
];

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground mb-2">What Parents Say</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-sunshine text-sunshine" />
            ))}
            <span className="ml-2 font-body text-muted-foreground text-sm">4.9 out of 5</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card rounded-2xl p-8 text-center shadow-sm"
          >
            <div className="flex justify-center gap-0.5 mb-4">
              {[...Array(reviews[current].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-sunshine text-sunshine" />
              ))}
            </div>
            <p className="font-body text-lg text-foreground mb-4 italic">"{reviews[current].text}"</p>
            <p className="font-display font-bold text-sm text-foreground">{reviews[current].name}</p>
            <p className="font-body text-xs text-muted-foreground">{reviews[current].detail}</p>
          </motion.div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1))}
              className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1))}
              className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
