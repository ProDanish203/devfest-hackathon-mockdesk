import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyHistory } from "@/lib/data";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <section>
      <Alert className="flex items-center justify-between w-full gap-x-3">
        <div>
          <AlertTitle>Prepare Now!</AlertTitle>
          <AlertDescription>
            <div className="">
              <p className="text-sm text-gray-600">
                prepare yourself for your interviews by practicing with our mock
                interview tool and get feedback from our AI expert.
              </p>
            </div>
          </AlertDescription>
        </div>
        <Link href="/dashboard/conduct">
          <Button>Conduct Interview</Button>
        </Link>
      </Alert>
      <div className="mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
