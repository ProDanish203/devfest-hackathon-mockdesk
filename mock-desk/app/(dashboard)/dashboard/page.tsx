import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyHistory } from "@/lib/data";
import React from "react";

const DashboardPage = () => {
  return (
    <section>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg: grid-cols-4 gap-5">
        {dummyHistory.map((item, idx) => (
          <InterviewCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;

interface InterviewCardProps {
  title: string;
  summary: string;
  tags: string[];
}

const InterviewCard = ({ title, summary, tags }: InterviewCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
