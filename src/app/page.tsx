import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AWARDS,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
} from "@/lib/constants";

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6 py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Hello, I&apos;m Timothy.</h1>
        <p className="text-xl text-muted-foreground">
          Aspiring AI Software Engineer
        </p>
      </header>

      <section id="education" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {EDUCATIONS.map((education, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{education.degree}</CardTitle>
              <CardDescription>
                {education.school} | {education.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{education.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="experiences" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mb-4">Experiences</h2>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {EXPERIENCES.map((experience, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{experience.role}</CardTitle>
                <CardDescription>
                  {experience.company} | {experience.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {experience.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </section>

      <section id="projects" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section id="awards">
        <h2 className="text-2xl font-semibold mb-4">Awards</h2>
        <ul className="list-disc pl-5 space-y-2">
          {AWARDS.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
