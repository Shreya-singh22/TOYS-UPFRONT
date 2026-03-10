import { motion } from "framer-motion";
import toyStacker from "@/assets/toy-stacker.jpg";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyDuck from "@/assets/toy-duck.jpg";
import toyBicycle from "@/assets/toy-bicycle.jpg";
import Image from "next/image";
import Link from "next/link";

const ageGroups = [
  { range: "0–2 Years", desc: "First discoveries", image: toyStacker, color: "bg-coral/15" },
  { range: "3–5 Years", desc: "Creative builders", image: toyBlocks, color: "bg-sky/15" },
  { range: "6–8 Years", desc: "Young explorers", image: toyDuck, color: "bg-mint/15" },
  { range: "9–12 Years", desc: "Big adventures", image: toyBicycle, color: "bg-sunshine/15" },
];

export default function ShopByAge() {
  return (
    <section id="age" className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground">Shop by Age</h2>
          <p className="font-body text-muted-foreground mt-1">Find age-appropriate toys for every stage.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ageGroups.map((g, i) => (
            <Link
              key={g.range}
              href="#"
              className={`group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${g.color}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={g.image}
                  alt={g.range}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display font-bold text-foreground text-sm lg:text-base">{g.range}</h3>
                <p className="font-body text-xs text-muted-foreground">{g.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

