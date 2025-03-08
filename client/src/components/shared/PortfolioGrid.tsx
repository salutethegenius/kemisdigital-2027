import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => (
        <Card
          key={project.title}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <CardContent className="p-0">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 flex items-center justify-center">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[#00A0E3]">Image Coming Soon</div>
                )}
              </div>
            </AspectRatio>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A0E3] hover:text-[#0078A8] text-sm mt-4 inline-block"
                >
                  Visit Project →
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
